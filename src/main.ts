import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { config as env } from './dotenv';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validaciones globales con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // Lanza error si se envían propiedades no permitidas
      transform: true, // Convierte los valores a los tipos definidos en DTOs
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Hermes')
    .setDescription(
      'Documentación de la API para el sistema de reporteria Hermes',
    )
    .setVersion('1.0')
    .addBearerAuth() // Agrega autenticación con JWT en Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors();

  // Verificar conexión a la base de datos
  const dataSource = app.get(DataSource);
  if (dataSource.isInitialized) {
    console.log('✅ Conectado a la base de datos correctamente');
  } else {
    console.error('❌ No se pudo conectar a la base de datos');
  }

  await app.listen(env.api.api_port);
  console.log(
    `🚀 Servidor corriendo en http://localhost:${env.api.api_port}/api`,
  );
}

bootstrap();
