import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { PaginatedResult } from 'interfaces/paginated-result.interface';
import { Quote } from 'entities/quote.entity';
import { CreateUpdateQuoteDto } from './dto/create-update-quote.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async paginated(@Query('page') page: number): Promise<PaginatedResult> {
    return this.quotesService.paginate(page);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.findById(id);
  }

  @Post('myquote')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req,
    @Body() createQuoteDto: CreateUpdateQuoteDto,
  ): Promise<Quote> {
    const cookie = req.cookies['access_token'];
    return this.quotesService.create(cookie, createQuoteDto);
  }

  @Patch('/myquote/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() createQuoteDto: CreateUpdateQuoteDto,
  ): Promise<Quote> {
    return this.quotesService.update(id, createQuoteDto);
  }

  @Patch(':id/upvote')
  @HttpCode(HttpStatus.OK)
  async upvote(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.upvote(id);
  }

  @Patch(':id/downvote')
  @HttpCode(HttpStatus.OK)
  async downvote(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.downvote(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.remove(id);
  }
}
