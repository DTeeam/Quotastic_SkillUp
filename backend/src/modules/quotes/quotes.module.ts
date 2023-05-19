import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';

@Module({
  providers: [QuotesService],
  controllers: [QuotesController]
})
export class QuotesModule {}
