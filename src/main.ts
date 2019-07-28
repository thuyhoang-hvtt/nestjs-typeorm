import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.ISDEV ? `${AppModule.HOST}:${AppModule.PORT}` : AppModule.HOST;

  const swaggerOption = new DocumentBuilder()
      .setTitle('NestJS RESTful APIs')
      .setDescription('APIs Documentation')
      .setVersion('1.0')
      .setHost(hostDomain.split('//')[1])
      .setSchemes(AppModule.ISDEV ? 'http' : 'https')
      .setBasePath('api')
      .addBearerAuth('Authorization', 'header')
      .build()
  
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOption);

  app.use('api/docs/swagger.json', (req, res) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup('api/docs', app, swaggerDoc);

  app.setGlobalPrefix('api');

  await app.listen(AppModule.PORT);
}
bootstrap();
