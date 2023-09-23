import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/dto/user/user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() dto: SignUpDto) {
    console.log(dto)
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  async signIn(@Body() dto: SignInDto): Promise<{ accessToken: string }> {
   
    return this.authService.signIn(dto);
  }

}
