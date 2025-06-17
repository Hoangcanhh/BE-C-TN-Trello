import { Controller, Post, Get, Body, HttpException, HttpStatus, HttpCode } from "@nestjs/common"
import { AuthService } from "./auth.service"

// DTO classes for better type safety
export class LoginDto {
  email: string
  password: string
}

export class RegisterDto {
  username: string
  email: string
  password: string
  confirmPassword: string
}

// ✅ New DTO for Google OAuth code exchange
export class GoogleCodeExchangeDto {
  code: string
  context: "signin" | "signup"
  redirect_uri: string
}

export class GoogleLoginDto {
  credential: string
  user: {
    email: string
    name: string
    picture: string
    sub: string
  }
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log("🔍 AuthController initialized")
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(loginDto: any) {
    return this.authService.login(loginDto.email, loginDto.password)
  }

  @Post("register")
  async register(registerDto: any) {
    return this.authService.register(
      registerDto.username,
      registerDto.email,
      registerDto.password,
      registerDto.confirmPassword,
    )
  }

  @Post("google/login")
  @HttpCode(HttpStatus.OK)
  async googleLogin(googleLoginDto: any) {
    console.log("🔍 Google login request received:", googleLoginDto)
    return this.authService.googleLogin(googleLoginDto.credential, googleLoginDto.user)
  }

  @Post("google/register")
  async googleRegister(googleRegisterDto: any) {
    console.log("🔍 Google register request received:", googleRegisterDto)
    return this.authService.googleRegister(googleRegisterDto)
  }

  @Post("google/exchange")
  async exchangeGoogleCode(exchangeDto: any) {
    console.log("🔍 Google code exchange request received:", {
      code: exchangeDto.code ? "Present" : "Missing",
      context: exchangeDto.context,
      redirect_uri: exchangeDto.redirect_uri,
    })
    return this.authService.exchangeGoogleCode(exchangeDto.code, exchangeDto.context, exchangeDto.redirect_uri)
  }

  // ✅ Thêm health check endpoint
  @Get("health")
  async health() {
    return { status: "ok", timestamp: new Date().toISOString() }
  }
}
