import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quote } from '../quotes/entity/quotes.entity';
import { quotes } from '../quotes/quotes.data';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const quoteRepo = app.get<Repository<Quote>>(getRepositoryToken(Quote));

  // Converte id para number se necessário
  const formattedQuotes = quotes.map((q) => ({
    ...q,
    id: Number(q.id),
  }));

  await quoteRepo.save(formattedQuotes);
  console.log('Quotes seeded!');
  await app.close();
}

bootstrap();
