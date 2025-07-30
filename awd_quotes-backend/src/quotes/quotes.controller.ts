import { Controller, Get, Param } from '@nestjs/common';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('/')
  findAll() {
    return this.quotesService.findAll();
  }

  @Get('random')
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }

  @Get(':author')
  findByAuthor(@Param('author') author: string) {
    return this.quotesService.findByAuthor(author);
  }
}
