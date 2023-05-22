import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'entities/user.entity';

export class CreateUpdateQuoteDto {
  @IsNotEmpty()
  @ApiProperty()
  quote: string;

  @IsNotEmpty()
  @ApiProperty()
  default: 0;
  likes: number;

  @IsNotEmpty()
  @ApiProperty()
  user: User;
}
