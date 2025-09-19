import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function initSwagger(app: INestApplication) {

  const apiPrefix = process.env.API_PREFIX || '';

  const config = new DocumentBuilder()
    .setTitle('API GESTÃO DE ACESSOS')
    .setDescription('API responsável por gerenciar os acessos dos usuários aos sistemas')
    .setVersion('2.1')
    .addServer(apiPrefix)
    .build();

  const document = SwaggerModule. createDocument(app, config);

  SwaggerModule.setup("docs", app, document);

}
