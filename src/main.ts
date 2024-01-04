import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      const config = new ConfigService();
      const allowedOrigins = [config.get('CORS_URL'), config.get('FRONT_URL')];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Rejected due to CORS'));
      }
    },
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: ['content-type'],
    credentials: true,
    optionsSuccessStatus: 200,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3333);
}
bootstrap();
