import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Repository } from 'typeorm';
import Logging from 'library/Logging';
import { Quote } from 'entities/quote.entity';
import { CreateUpdateQuoteDto } from './dto/create-update-quote.dto';

@Injectable()
export class QuotesService extends AbstractService {
  constructor(
    @InjectRepository(Quote)
    private readonly quotesRepository: Repository<Quote>,
  ) {
    super(quotesRepository);
  }

  async create(createQuoteDto: CreateUpdateQuoteDto): Promise<Quote> {
    try {
      const quote = this.quotesRepository.create(createQuoteDto);
      return this.quotesRepository.save(quote);
    } catch (error) {
      Logging.error(error);
      throw new BadRequestException('Could not create a new quote');
    }
  }
  async update(
    quoteId: string,
    updateQuoteDto: CreateUpdateQuoteDto,
  ): Promise<Quote> {
    const quote = (await this.findById(quoteId)) as Quote;
    try {
      quote.quote = updateQuoteDto.quote;

      return this.quotesRepository.save(quote);
    } catch (error) {
      Logging.error(error);
      throw new BadRequestException('Could not update the quote');
    }
  }
}
