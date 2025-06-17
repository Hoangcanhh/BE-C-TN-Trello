import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { JwtService } from "@nestjs/jwt"
import { Repository } from "typeorm"
import { User } from "../modules/user/entities/user.entity"
import * as bcrypt from "bcryptjs"
import { OAuth2Client } from "google-auth-library"

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client
  private userRepository: Repository<User>

  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.userRepository = userRepository

    // ✅ Khởi tạo Google OAuth client
    this.googleClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.FRONTEND_URL || "http://localhost:5173"}/auth/google/callback`,
    )

    console.log("🔍 AuthService initialized")
    console.log("🔍 JWT Secret configured:", process.env.JWT_SECRET ? "Yes" : "No")
    console.log("🔍 Google Client ID configured:", process.env.GOOGLE_CLIENT_ID ? "Yes" : "No")
  }

  async exchangeGoogleCode(code: string, context: "signin" | "signup", redirect_uri: string) {
    try {
      console.log("🔍 Exchanging Google OAuth code for tokens")
      console.log("🔍 Context:", context)
      console.log("🔍 Redirect URI:", redirect_uri)

      // Exchange authorization code for tokens
      const { tokens } = await this.googleClient.getToken(code)
      console.log("🔍 Tokens received:", {
        access_token: tokens.access_token ? "Present" : "Missing",
        id_token: tokens.id_token ? "Present" : "Missing",
      })

      if (!tokens.id_token) {
        throw new UnauthorizedException("No ID token received from Google")
      }

      // Verify and decode the ID token
      const ticket = await this.googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()
      console.log("🔍 Google token payload:", {
        email: payload?.email,
        name: payload?.name,
        picture: payload?.picture,
        email_verified: payload?.email_verified,
        sub: payload?.sub,
      })

      if (!payload || !payload.email_verified) {
        throw new UnauthorizedException("Email chưa được xác thực bởi Google")
      }

      const user = {
        email: payload.email,
        name: payload.name || "User",
        picture: payload.picture || "",
        sub: payload.sub,
        email_verified: payload.email_verified,
      }

      console.log("✅ Google code exchange successful")
      console.log("✅ User info to return:", user)

      return {
        user,
        credential: tokens.id_token,
      }
    } catch (error: any) {
      console.error("❌ Google code exchange error:", error)
      throw new UnauthorizedException(error.message || "Google code exchange failed")
    }
  }

  async googleLogin(credential: string, userData: any) {
    try {
      console.log("🔍 === GOOGLE LOGIN START ===")
      console.log("🔍 Credential length:", credential?.length || 0)
      console.log("🔍 User data received:", userData)

      if (!credential) {
        throw new UnauthorizedException("No credential provided")
      }

      // Verify the Google ID token
      const ticket = await this.googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()
      console.log("🔍 Google token payload in login:", {
        email: payload?.email,
        name: payload?.name,
        picture: payload?.picture,
        email_verified: payload?.email_verified,
        sub: payload?.sub,
      })

      if (!payload || !payload.email_verified) {
        throw new UnauthorizedException("Email chưa được xác thực bởi Google")
      }

      // ✅ Ưu tiên thông tin từ payload (từ Google token) thay vì userData
      const googleUserInfo = {
        email: payload.email,
        name: payload.name || userData?.name || `user_${Date.now()}`,
        picture: payload.picture || userData?.picture || "",
        sub: payload.sub,
      }

      console.log("🔍 Final Google user info:", googleUserInfo)

      // Find or create user
      let user = await this.userRepository.findOne({
        where: { email: googleUserInfo.email },
      })

      if (!user) {
        console.log("🔍 Creating new user from Google login")
        // ✅ FIX: Đảm bảo tạo user mới với đầy đủ thông tin
        user = this.userRepository.create({
          email: googleUserInfo.email,
          username: googleUserInfo.name,
          googleId: googleUserInfo.sub,
          avatar: googleUserInfo.picture,
          isGoogleUser: true,
          password: null, // Google users don't have passwords
        })

        try {
          await this.userRepository.save(user)
          console.log("✅ New Google user created:", {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          })
        } catch (saveError) {
          console.error("❌ Error saving new user:", saveError)
          // ✅ FIX: Nếu lỗi unique constraint, tìm user đã tồn tại
          if (saveError.code === "23505") {
            // PostgreSQL unique violation
            console.log("🔍 User may already exist with this email, trying to find...")
            user = await this.userRepository.findOne({
              where: { email: googleUserInfo.email },
            })

            if (!user) {
              throw new Error("Failed to create or find user")
            }
            console.log("✅ Found existing user:", user.id)
          } else {
            throw saveError
          }
        }
      } else {
        console.log("🔍 User exists, updating Google info if needed")
        // Update existing user with latest Google info
        let needsUpdate = false

        if (!user.googleId) {
          user.googleId = googleUserInfo.sub
          user.isGoogleUser = true
          needsUpdate = true
        }

        if (googleUserInfo.picture && user.avatar !== googleUserInfo.picture) {
          user.avatar = googleUserInfo.picture
          needsUpdate = true
        }

        if (user.username !== googleUserInfo.name) {
          user.username = googleUserInfo.name
          needsUpdate = true
        }

        if (needsUpdate) {
          try {
            await this.userRepository.save(user)
            console.log("✅ Updated existing user with Google info:", {
              id: user.id,
              username: user.username,
              email: user.email,
              avatar: user.avatar,
            })
          } catch (updateError) {
            console.error("❌ Error updating user:", updateError)
            // Continue anyway since we have the user
          }
        }
      }

      // Generate JWT token
      const jwtPayload = {
        email: user.email,
        sub: user.id,
        username: user.username,
      }

      // ✅ FIX: Đảm bảo JWT Secret được cấu hình
      if (!process.env.JWT_SECRET) {
        console.warn("⚠️ JWT_SECRET not configured, using fallback secret")
        // Vẫn tiếp tục với secret mặc định
      }

      const token = this.jwtService.sign(jwtPayload)

      const loginResponse = {
        token,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        message: "Đăng nhập Google thành công",
      }

      console.log("✅ === GOOGLE LOGIN SUCCESS ===")
      console.log("✅ Response data:", loginResponse)

      return loginResponse
    } catch (error) {
      console.error("❌ === GOOGLE LOGIN ERROR ===")
      console.error("❌ Error:", error.message)
      console.error("❌ Stack:", error.stack)

      if (error.message.includes("Token used too early")) {
        throw new UnauthorizedException("Token Google không hợp lệ hoặc đã hết hạn")
      }
      throw new UnauthorizedException(error.message || "Google authentication failed")
    }
  }

  async googleRegister(googleRegisterData: any): Promise<any> {
    try {
      console.log("🔍 === GOOGLE REGISTER START ===")
      console.log("🔍 User data:", googleRegisterData.user)

      if (!googleRegisterData.credential) {
        throw new BadRequestException("No credential provided")
      }

      // Verify the Google ID token
      const ticket = await this.googleClient.verifyIdToken({
        idToken: googleRegisterData.credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()
      console.log("🔍 Google register payload:", {
        email: payload?.email,
        name: payload?.name,
        picture: payload?.picture,
        email_verified: payload?.email_verified,
        sub: payload?.sub,
      })

      if (!payload || !payload.email_verified) {
        throw new UnauthorizedException("Email chưa được xác thực bởi Google")
      }

      // ✅ Ưu tiên thông tin từ payload
      const googleUserInfo = {
        email: payload.email,
        name: payload.name || googleRegisterData.user?.name || `user_${Date.now()}`,
        picture: payload.picture || googleRegisterData.user?.picture || "",
        sub: payload.sub,
      }

      // Check if user already exists
      let user = await this.userRepository.findOne({
        where: { email: googleUserInfo.email },
      })

      if (user) {
        // User exists, update with Google info
        if (!user.googleId) {
          user.googleId = googleUserInfo.sub
          user.isGoogleUser = true
          if (googleUserInfo.picture) user.avatar = googleUserInfo.picture
          if (googleUserInfo.name) user.username = googleUserInfo.name
          await this.userRepository.save(user)
        }
        console.log("✅ Updated existing user with Google info")
      } else {
        // Create new user
        console.log("🔍 Creating new user from Google registration")
        user = this.userRepository.create({
          email: googleUserInfo.email,
          username: googleUserInfo.name,
          googleId: googleUserInfo.sub,
          avatar: googleUserInfo.picture,
          isGoogleUser: true,
          password: null, // Google users don't have passwords
        })
        await this.userRepository.save(user)
        console.log("✅ New Google user created:", {
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        })
      }

      return {
        message: "Đăng ký Google thành công",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        },
      }
    } catch (error) {
      console.error("❌ === GOOGLE REGISTER ERROR ===")
      console.error("❌ Error:", error.message)

      if (error.message.includes("Token used too early")) {
        throw new BadRequestException("Token Google không hợp lệ hoặc đã hết hạn")
      }
      throw new BadRequestException(error.message || "Google registration failed")
    }
  }

  async login(email: string, password: string) {
    console.log("🔍 Login attempt for email:", email)

    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) {
      console.error("❌ User not found:", email)
      throw new UnauthorizedException("Email not found")
    }

    // Check if it's a Google user trying to login with password
    if (user.isGoogleUser && !user.password) {
      throw new UnauthorizedException("Tài khoản này được tạo bằng Google. Vui lòng đăng nhập bằng Google.")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      console.error("❌ Invalid password for user:", email)
      throw new UnauthorizedException("Invalid password")
    }

    const payload = { email: user.email, sub: user.id, username: user.username }
    const token = this.jwtService.sign(payload)

    console.log("✅ Login successful for user:", user.username)
    return {
      token,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      message: "Đăng nhập thành công",
    }
  }

  async register(username: string, email: string, password: string, confirmPassword: string) {
    console.log("🔍 Registration attempt for:", { username, email })

    // Validate passwords match
    if (password !== confirmPassword) {
      throw new BadRequestException("Mật khẩu xác nhận không khớp")
    }

    // Validate password length
    if (password.length < 6) {
      throw new BadRequestException("Mật khẩu phải có ít nhất 6 ký tự")
    }

    // Validate username length
    if (username.length < 3) {
      throw new BadRequestException("Username phải có ít nhất 3 ký tự")
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new BadRequestException("Email không hợp lệ")
    }

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } })
    if (existingUser) {
      throw new ConflictException("Email đã được sử dụng")
    }

    // Check if username already exists
    const existingUsername = await this.userRepository.findOne({ where: { username } })
    if (existingUsername) {
      throw new ConflictException("Username đã được sử dụng")
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      isGoogleUser: false,
    })

    const savedUser = await this.userRepository.save(user)
    console.log("✅ User registered successfully:", savedUser.username)

    return {
      message: "Đăng ký thành công",
      user: {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
      },
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { id } })
    } catch (error) {
      console.error("❌ Error finding user by ID:", error.message)
      return null
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { email } })
    } catch (error) {
      console.error("❌ Error finding user by email:", error.message)
      return null
    }
  }
}
