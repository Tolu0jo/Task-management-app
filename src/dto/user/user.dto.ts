import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

export class SignUpDto{
     @IsEmail()
     @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(10)
    username:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message: "Password too weak "})
    password:string;
}




export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
   email:string;

   @IsString()
   @IsNotEmpty()
   password:string;
}