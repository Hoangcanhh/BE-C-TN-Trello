import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Địa chỉ frontend của bạn
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
  );
}
bootstrap();
