import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO, TaskFilTerDto } from '../dto/task/task.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(dto: TaskFilTerDto) {
    const { status, search } = dto;
    const query: SelectQueryBuilder<Task> =
      await this.taskRepository.createQueryBuilder('task');

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

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async createTask(dto: CreateTaskDTO): Promise<Task> {
    const { title, description } = dto;
    const task = new Task();

    task.id = uuidv4().toString();
    task.title = title;
    task.description = description;
    task.status = 'OPEN';
    await task.save();

    return task;
  }

  async editTask(id: string, status: string) {
    const task = await this.taskRepository.update(id, {
      status,
    });
    if (!task.affected) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return { updated: `task ${id} updated` };
  }
  async deleteTask(id: string) {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return { Deleted: `task ${id} Deleted` };
  }
}
