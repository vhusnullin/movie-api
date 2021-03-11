import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './web/AppExceptionFilter';

dotenv.config();
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Movie Api')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.addTag('cats')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
	app.useGlobalFilters(new AppExceptionFilter());
	await app.listen(process.env.APP_PORT)
		.then(() => console.log('Application started http://localhost:' + process.env.APP_PORT + '/docs'));
}
bootstrap();
