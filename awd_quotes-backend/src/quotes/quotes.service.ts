import { Injectable } from '@nestjs/common';
import { Quote } from '../types/app.type';
import { getQuotes } from './quotes.data';
import slugify from 'slugify';

@Injectable()
export class QuotesService {
  private quotes: Quote[];

  constructor() {
    this.quotes = getQuotes();
  }

  findAll(): Quote[] {
    return [...this.quotes];
  }

  findByAuthor(slug: string): Quote[] {
    return this.quotes.filter(
      (quote) => slugify(quote.author, { lower: true, strict: true }) === slug,
    );
  }

  getRandomQuote(): Quote {
    const quotes = getQuotes();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
}
