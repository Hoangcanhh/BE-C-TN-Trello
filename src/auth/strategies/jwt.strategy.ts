import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) { // Inject trực tiếp AuthService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "your-jwt-secret-key-here",
    });
    console.log("🔍 JwtStrategy initialized");
  }

  async validate(payload: any) {
    console.log("🔍 JWT payload:", payload);

    try {
      const user = await this.authService.findUserById(payload.sub);
      if (!user) {
        console.error("❌ User not found for ID:", payload.sub);
        throw new UnauthorizedException("User not found");
      }

      console.log("✅ JWT validation successful for user:", user.username);
      return {
        userId: payload.sub,
        email: payload.email,
        username: payload.username,
      };
    } catch (error) {
      console.error("❌ JWT validation error:", error.message);
      throw new UnauthorizedException("Invalid token");
    }
  }
}