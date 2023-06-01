import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../common/abstract.service';
import { Repository } from 'typeorm';
import Logging from 'library/Logging';
import { Quote } from 'entities/quote.entity';
import { CreateUpdateQuoteDto } from './dto/create-update-quote.dto';
import { AuthService } from 'modules/auth/auth.service';
import { User } from 'entities/user.entity';
import { Vote } from 'entities/vote.entity';

@Injectable()
export class QuotesService extends AbstractService {
  constructor(
    @InjectRepository(Quote)
    private readonly quotesRepository: Repository<Quote>,
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
    @Inject(AuthService) private authService: AuthService,
  ) {
    super(quotesRepository);
  }

  async create(createQuoteDto: CreateUpdateQuoteDto): Promise<Quote> {
    try {
      const quote = this.quotesRepository.create(createQuoteDto);
      const user: any = this.authService.user;
      console.log(user);

      return this.quotesRepository.save(quote, user.id);
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

  async upvote(quoteId: string): Promise<Quote> {
    const quote = (await this.findById(quoteId)) as Quote;
    const data = await this.votesRepository.find({
      relations: ['quote'],
      where: {
        quote: {
          id: quoteId,
        },
      },
    });

    try {
      quote.votes++;
      return this.quotesRepository.save(quote);
    } catch (error) {
      Logging.error(error);
      throw new BadRequestException('Could not upvote quote');
    }
  }

  async downvote(quoteId: string): Promise<Quote> {
    const quote = (await this.findById(quoteId)) as Quote;
    try {
      quote.votes--;

      return this.quotesRepository.save(quote);
    } catch (error) {
      Logging.error(error);
      throw new BadRequestException('Could not downvote the quote');
    }
  }
}
