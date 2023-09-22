import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/dto/user/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService){}


    @Post("/signup")
    signUp(@Body() dto:SignUpDto){
        return this.authService.signUp(dto)
    };

    @Post("/signin")
    async signIn(@Body() dto:SignInDto):Promise<{token:string}>{
        return this.authService.signIn(dto)
    };
    // @UseGuards(AuthGuard())

  
}
