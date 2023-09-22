import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto, SignInDto } from 'src/dto/user/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as argon from 'argon2';
import _ from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    try {
      const { email, username, password } = dto;
      const hash = await argon.hash(dto.password);

      const newUser = await this.userRepository
        .create({
          id: uuid(),
          email,
          username,
          password: hash,
        })
        .save();



      return newUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(dto: SignInDto) :Promise<{token: string}> {
    try {
      const { email, password } = dto;
      const user = await this.userRepository.findOneBy({ email });
      if (user && (await user.validatePassword(password))) {
        
        const {id}=user
        const payload ={id}
        const token = await this.jwtService.signAsync(payload)
        return {token}; 
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };
}
