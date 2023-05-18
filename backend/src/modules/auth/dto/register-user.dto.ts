import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { Match } from 'decorators/match.decorator';

export class RegisterUserDto {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
    message:
      'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters',
  })
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @Match(RegisterUserDto, (field) => field.password, {
    message: 'Passwords do not match',
  })
  @ApiProperty()
  confirm_password: string;
}
