import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  Req,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Public } from 'decorators/public.decorator';
import { User } from 'entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { RequestWithUser } from 'interfaces/auth.interface';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const access_token = await this.authService.generateJwt(req.user);
    res.cookie('access_token', access_token, { httpOnly: true });
    return req.user;
  }

  //TODO add this to quotes controller probably
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async user(@Req() req: Request): Promise<User> {
    const cookie = req.cookies['access_token'];
    return this.authService.user(cookie);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
  }
}
