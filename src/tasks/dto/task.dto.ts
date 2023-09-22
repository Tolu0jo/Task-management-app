import {IsString, IsNotEmpty,IsOptional, IsIn} from "class-validator"
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
    @IsIn(["OPEN", "IN_PROGRESS", "DONE"])
    status: "OPEN" | "IN PROGRESS" | "DONE";
}


export class TaskFilTerDto{
    @IsOptional()
    @IsIn(["OPEN", "IN_PROGRESS", "DONE"])
    status:string;

    @IsOptional()
    @IsNotEmpty()
    search: string
}
