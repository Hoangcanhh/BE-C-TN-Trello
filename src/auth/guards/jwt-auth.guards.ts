import { Injectable, type ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Reflector } from "@nestjs/core"
import { IS_PUBLIC_KEY } from "../decorator/public.decorator"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    console.log("🔍 JWT Guard - Checking authentication")

    // Kiểm tra xem route có được đánh dấu là public không
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      console.log("✅ JWT Guard - Public route, skipping authentication")
      return true
    }

    return super.canActivate(context)
  }

  handleRequest(err: any, user: any, info: any) {
    console.log("🔍 JWT Guard - Handle request:", { err: err?.message, user: user?.username, info })

    if (err || !user) {
      console.error("❌ JWT Guard - Authentication failed:", err?.message || info?.message)
      throw err || new UnauthorizedException("Invalid or expired token")
    }

    console.log("✅ JWT Guard - Authentication successful for:", user.username)
    return user
  }
}
