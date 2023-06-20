import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'entities/user.entity';
import Logging from 'library/Logging';
import { UsersService } from 'modules/users/users.service';
import { compareHash, hash } from 'utils/bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { Request } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    Logging.info('Validating user....');
    const user = await this.usersService.findBy({ email: email });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!(await compareHash(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    Logging.info('Valid user');
    return user;
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await hash(registerUserDto.password);

    return await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.id, name: user.email },
      { secret: process.env.JWT_SECRET },
    );
  }

  async user(cookie: string): Promise<User> {
    const data = this.getUserId(cookie);
    return this.usersService.findById(data['id']);
  }

  async getUserId(jwt: string): Promise<string> {
    //const jwt = request.cookies['access_token'];
    try {
      const data = await this.jwtService.verifyAsync(jwt, {
        secret: process.env.JWT_SECRET,
      });
      const userID = data['sub'];
      return userID;
    } catch (error) {
      throw new BadRequestException('User not authenticated');
    }
  }
}
