import { BadRequestException, PipeTransform } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses=[
        "OPEN",
        "IN_PROGRESS",
        "DONE"
    ]

    transform(value){
        console.log(value)
        value = value.trim().toUpperCase();
        if(!this.allowedStatuses.includes(value)){
        throw new BadRequestException(`${value} is not valid`) 
        }
     return value;
    }
}