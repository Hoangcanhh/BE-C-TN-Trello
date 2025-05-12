// trello-backend/src/modules/activitylog/activitylog.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Board } from '../../board/entities/board.entity';
import { Card } from '../../card/entities/card.entity';

@Entity('activitylog')
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => Board, { nullable: true, onDelete: 'CASCADE' })
  board: Board;

  @ManyToOne(() => Card, { nullable: true, onDelete: 'CASCADE' })
  card: Card;

  @CreateDateColumn()
  created_at: Date;
}