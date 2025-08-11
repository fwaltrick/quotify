import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entity/quotes.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import slugify from 'slugify';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ data: Quote[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.quotesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });
    return { data, total, page, limit };
  }

  findOne(id: number): Promise<Quote> {
    return this.quotesRepository.findOneByOrFail({ id });
  }

  create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const quote = this.quotesRepository.create({
      quote: createQuoteDto.text,
      author: createQuoteDto.author,
      authorSlug: createQuoteDto.author
        ? slugify(createQuoteDto.author, { lower: true, strict: true })
        : undefined,
    });
    return this.quotesRepository.save(quote);
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    if (updateQuoteDto.author) {
      updateQuoteDto.authorslug = slugify(updateQuoteDto.author, {
        lower: true,
        strict: true,
      });
    }
    // Map DTO to entity fields
    const updateData: Partial<Quote> = {
      quote: updateQuoteDto.text,
      author: updateQuoteDto.author,
      authorSlug: updateQuoteDto.authorslug,
    };
    await this.quotesRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.quotesRepository.delete(id);
    return { deleted: true };
  }

  async findByAuthor(slug: string): Promise<Quote[]> {
    return this.quotesRepository.find({ where: { authorSlug: slug } });
  }

  async getRandomQuote(): Promise<Quote> {
    const quotes = await this.quotesRepository.find();
    if (!quotes.length) throw new NotFoundException('No quotes found');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
}
