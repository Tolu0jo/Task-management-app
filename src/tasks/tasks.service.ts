import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO, EditTaskDTO, GetTaskFilTerDto } from './dto/task.dto';
import { TaskStatusValidationPipe } from './dto/task-status-validation-pipe';
@Injectable()
export class TasksService {
//   private tasks: Task[] = [];

//   getAllTasks(): Task[] {
//     return this.tasks;
//   }
//   getTaskWithFilter(dto: GetTaskFilTerDto) {
//     const { status, search } = dto;
//     let tasks = this.getAllTasks();

//     if (status) {
//       tasks = this.tasks.filter((t) => t.status === dto.status);
//     }
//     if (search) {
//       tasks = this.tasks.filter(
//         (t) => t.title.includes(search) || t.description.includes(search),
//       );
//     }

//     return tasks;
//   }
//   getTask(id: string) {
//     const tasks = this.tasks;
//     const task = tasks.find((task) => task.id === id);
//     if (!task) {
//       throw new NotFoundException('Task not found');
//     }
//     return task;
//   }

//   createTask(dto: CreateTaskDTO): Task {
//     const { title, description } = dto;
//     const task: Task = {
//       id: uuidv4().toString(),
//       title,
//       description,
//       status: 'OPEN',
//     };
//     this.tasks.push(task);
//     return task;
//   }

//   editTask(id: string, dto: EditTaskDTO): Task {
//     const tasks = this.tasks;
//     const task = tasks.find((task) => task.id === id);
//     if (!task) {
//       throw new NotFoundException('Task not found');
//     }

//     task.status = dto.status;
//     task.description = dto.description;
//     task.title = dto.title;

//     return task;
//   }
//   deleteTask(id: string) {
//     const found = this.getTask(id);
//     this.tasks = this.tasks.filter((task) => task.id !== found.id);

//     return this.tasks;
//   }
}
