import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO, EditTaskDTO, GetTaskFilTerDto } from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(@Query()filterDto:GetTaskFilTerDto): Task[] {
    if(Object.keys(filterDto).length){
        return this.tasksService.getTaskWithFilter(filterDto)
    }else{
        return this.tasksService.getAllTasks();
    }
   
  }
   

  @Get(':id')
  getTask(@Param('id') id: string): Task {
    return this.tasksService.getTask(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch(':id')
  editTask(@Param('id') id: string, 
  @Body() editTaskDTO: EditTaskDTO): Task {
    return this.tasksService.editTask(id, editTaskDTO);
  }

  @Delete(":id")
  deleteTask(id: string) :Task[]{
     return this.tasksService.deleteTask(id);
  }
}
