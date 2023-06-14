import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';
import { User } from 'entities/user.entity';
import { JoinColumn, ManyToOne } from 'typeorm';

export class CreateUpdateQuoteDto {
  @IsNotEmpty()
  @ApiProperty()
  quote: string;

  @IsOptional()
  @ApiProperty()
  default: 0;
  votes: number;

  @ApiProperty({ type: () => User })
  user: User;
}
