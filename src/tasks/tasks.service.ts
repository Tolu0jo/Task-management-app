import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO, EditTaskDTO, GetTaskFilTerDto } from './task.dto';
@Injectable()
export class TasksService {
private tasks:Task[]=[];

getAllTasks():Task[] {
return this.tasks
}
getTaskWithFilter(dto:GetTaskFilTerDto){
    const{status,search}=dto
 let tasks = this.getAllTasks();

 if(status){
    tasks = this.tasks.filter(t => t.status === dto.status);
 }
 if(search){
    tasks = this.tasks.filter(t => t.title.includes(search)|| t.description.includes(search));
 }

return tasks

}
getTask(id:string){
   const tasks = this.tasks;
   const task = tasks.find(task => task.id === id)
   return task;
}


createTask(dto:CreateTaskDTO):Task {
    const{title, description}=dto
    const task: Task ={
        id:uuidv4().toString(),
        title,
        description,
        status: "OPEN"
    }
    this.tasks.push(task)
    return task
}

editTask(id:string,dto:EditTaskDTO):Task{
    const tasks = this.tasks;
    const task = tasks.find(task => task.id === id)
     task.status=dto.status;
     task.description=dto.description;
     task.title=dto.title;

    return task;
}
deleteTask(id:string){
    this.tasks = this.tasks.filter(task => task.id !== id)
   return this.tasks
}

}
