// trello-backend/src/modules/task/task.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Card } from '../../card/entities/card.entity';
import { TaskStatusEnum } from '../../../enum/task.enum';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn({ name: 'task_id' })
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  assigned_to: User;

  @ManyToOne(() => Card, { onDelete: 'CASCADE' })
  card: Card;

  @Column()
  due_date: Date;

  @Column({ default: 'pending' })
  status: TaskStatusEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}