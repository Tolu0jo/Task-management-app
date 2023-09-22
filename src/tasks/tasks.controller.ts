import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDTO, TaskFilTerDto } from '../dto/task/task.dto';

import { TaskStatusValidationPipe } from 'src/dto/task/task-status-validation-pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Task } from 'src/entities/task.entity';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  async getAllTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) filterDto: TaskFilTerDto,
  ) {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get(':id')
  getTask(
    @Param('id') id: string,
    @GetUser('id') userId: string,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, userId);
  }

  @Post()
  createTask(
    @GetUser() user: User,
    @Body() createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Patch(':id')
  async editTask(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body('status', TaskStatusValidationPipe) status: string,
  ) {
    return await this.tasksService.editTask(id, status, userId);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string, 
  @GetUser('id') userId: string) {
    return await this.tasksService.deleteTask(id, userId);
  }
}
