import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { List } from '../../list/entities/list.entity';
import { User } from '../../user/entities/user.entity';

@Entity('card')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => List, { onDelete: 'CASCADE' })
  list: List;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  assigned_to: User;

  @Column({ nullable: true })
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Card, { onDelete: 'CASCADE' })
  card: Card;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('attachment')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Card, { onDelete: 'CASCADE' })
  card: Card;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}