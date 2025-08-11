import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { Quote } from './quotes/entity/quotes.entity';

@Module({
  imports: [
    QuotesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Quote],
      synchronize: false,
      migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
      migrationsRun: false,
      logging: ['query', 'error'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
