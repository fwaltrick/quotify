import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quote } from './entity/quotes.entity';

const mockQuote = {
  id: 1,
  quote: 'Test quote',
  author: 'Test Author',
  authorSlug: 'test-author',
};

describe('QuotesService', () => {
  let service: QuotesService;

  beforeEach(async () => {
    const repoMock = {
      find: jest.fn().mockResolvedValue([mockQuote]),
      findOneByOrFail: jest.fn().mockResolvedValue(mockQuote),
      create: jest.fn().mockReturnValue(mockQuote),
      save: jest.fn().mockResolvedValue(mockQuote),
      update: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
      findAndCount: jest.fn().mockResolvedValue([[mockQuote], 1]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: getRepositoryToken(Quote),
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<QuotesService>(QuotesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all quotes with pagination', async () => {
    const result = await service.findAll(1, 10);
    expect(result).toEqual({
      data: [mockQuote],
      total: 1,
      page: 1,
      limit: 10,
    });
  });

  it('should return one quote by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockQuote);
  });

  it('should create a quote', async () => {
    const result = await service.create({
      text: 'Test quote',
      author: 'Test Author',
    });
    expect(result).toEqual(mockQuote);
  });

  it('should update a quote', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockQuote as Quote);
    const result = await service.update(1, {
      text: 'Updated',
      author: 'Test Author',
    });
    expect(result).toEqual(mockQuote);
  });

  it('should remove a quote', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ deleted: true });
  });
});
