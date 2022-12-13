import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'apiKey',
        description: 'JWT Authorization header using Bearer token. ',
        name: 'Authorization',
        in: 'headers',
      },
      'Bearer',
    )
    .setTitle('Authentication API')
    .setDescription('Registration and Login API for Coinomy project')
    .setVersion('v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(3000);
}
bootstrap();
