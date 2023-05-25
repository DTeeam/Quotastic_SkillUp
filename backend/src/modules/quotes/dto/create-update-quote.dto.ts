import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';
import { User } from 'entities/user.entity';

export class CreateUpdateQuoteDto {
  @IsNotEmpty()
  @ApiProperty()
  quote: string;

  @IsOptional()
  @ApiProperty()
  default: 0;
  votes: number;
}
