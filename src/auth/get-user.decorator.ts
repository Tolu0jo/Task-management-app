import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext):User => {
    const request = ctx.switchToHttp().getRequest();
    if(data){
        return request.user[data]
    }
    return request.user;

  },
);