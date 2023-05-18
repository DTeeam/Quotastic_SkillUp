import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, Matches, ValidateIf } from 'class-validator';
import { Match } from 'decorators/match.decorator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  first_name?: string;

  @IsOptional()
  @ApiProperty()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @ApiProperty()
  avatar?: string;

  @ValidateIf((o) => typeof o.password === 'string' && o.password.length > 0)
  @IsOptional()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
    message:
      'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters',
  })
  @ApiProperty()
  password?: string;

  @ValidateIf(
    (o) =>
      typeof o.confirm_password === 'string' && o.confirm_password.length > 0,
  )
  @IsOptional()
  @Match(UpdateUserDto, (field) => field.password, {
    message: 'Passwords do not match',
  })
  @ApiProperty()
  confirm_password?: string;
}
