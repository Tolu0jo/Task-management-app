import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/dto/user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}


    @Post("/signup")
    signUp(@Body() dto:SignUpDto){
        return this.authService.signUp(dto)
    };

    @Post("/signin")
    async signIn(@Body() dto:SignInDto){
        return this.authService.signIn(dto)
    }

}
