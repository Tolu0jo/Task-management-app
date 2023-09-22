import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO, TaskFilTerDto } from '../dto/task/task.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from 'src/entities/user.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(dto: TaskFilTerDto, user: User) {
    const { status, search } = dto;
    const query: SelectQueryBuilder<Task> =
      this.taskRepository.createQueryBuilder('task');

    query.where(`task.userId=:userId`, { userId: user.id });

    if (status) {
      query.andWhere('task.status=:status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async getTaskById(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async createTask(dto: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = dto;
    const task = new Task();

    task.id = uuidv4().toString();
    task.title = title;
    task.description = description;
    task.status = 'OPEN';
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }

  async editTask(id: string, status: string, userId: string) {
    const task = await this.taskRepository.update(
      { id, userId },
      {
        status,
      },
    );
    if (!task.affected) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return { updated: `task ${id} updated` };
  }
  async deleteTask(id: string, userId: string) {
    const result = await this.taskRepository.delete({ id, userId });
    if (!result.affected) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return { Deleted: `task ${id} Deleted` };
  }
}
