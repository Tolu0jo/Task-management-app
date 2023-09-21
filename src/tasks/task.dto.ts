import {IsString, IsNotEmpty,IsOptional} from "class-validator"
export class CreateTaskDTO{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class EditTaskDTO{
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
    
    @IsString()
    @IsOptional()
    status: "OPEN" | "IN PROGRESS" | "DONE";
}

export class GetTaskFilTerDto{
    status: "OPEN" | "IN PROGRESS" | "DONE";
    search: string
}