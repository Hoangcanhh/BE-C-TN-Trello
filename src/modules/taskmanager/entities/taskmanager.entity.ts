import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Task } from '../../task/entities/task.entity';

@Entity('taskmanager')
export class TaskManager {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  reminder_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}