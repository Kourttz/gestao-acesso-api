import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function initSwagger(app: INestApplication) { 
    // Configuração do Swagger
    const config = new DocumentBuilder() 
        .setTitle( 'API GESTÃO DE ACESSOS') 
        .setDescription('API responsável por gerenciar os acessos dos usuários aos sistemas') 
        .setVersion("1.0") .build();
        
    const document = SwaggerModule. createDocument(app, config);

    SwaggerModule.setup("api", app, document);
}