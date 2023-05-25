import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from 'entities/quote.entity';
import { AuthService } from 'modules/auth/auth.service';
import { User } from 'entities/user.entity';
import { UsersService } from 'modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Vote } from 'entities/vote.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, User, Vote])],
  providers: [QuotesService, AuthService, UsersService, JwtService, Repository],
  controllers: [QuotesController],
})
export class QuotesModule {}
