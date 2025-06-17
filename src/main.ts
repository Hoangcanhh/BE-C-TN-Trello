import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // ✅ CORS configuration chi tiết
  app.enableCors({
    origin: [
      "http://localhost:5173", // Vite dev server
      "http://localhost:3000", // React dev server
      "http://localhost:4173", // Vite preview
      "http://127.0.0.1:5173", // Alternative localhost
      "https://accounts.google.com", // Google domain
      "https://www.googleapis.com", // Google APIs
    ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
    ],
    exposedHeaders: ["Access-Control-Allow-Origin"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  const port = process.env.PORT || 3000
  await app.listen(port)

  console.log(`🚀 Server running on http://localhost:${port}`)
  console.log(`📡 Available endpoints:`)
  console.log(`   POST http://localhost:${port}/auth/login`)
  console.log(`   POST http://localhost:${port}/auth/register`)
  console.log(`   POST http://localhost:${port}/auth/google-login`)
  console.log(`   POST http://localhost:${port}/auth/google-register`)
}

bootstrap()
