import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'entities/user.entity';
import Logging from 'library/Logging';
import { UsersService } from 'modules/users/users.service';
import { compareHash, hash } from 'utils/bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { Request } from 'express';

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

    return this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id, name: user.email });
  }

  async user(cookie: string): Promise<User> {
    const data = await this.jwtService.verifyAsync(cookie);
    return this.usersService.findById(data['id']);
  }

  async getUserId(request: Request): Promise<string> {
    if (!request.user) {
      throw new BadRequestException('User not authenticated');
    }

    const user = request.user as User;
    return user.id;
  }
}
