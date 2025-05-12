// trello-backend/src/modules/board/board.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  owner: User;

  @ManyToOne(() => Workspace, { nullable: true, onDelete: 'SET NULL' })
  workspace: Workspace;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}