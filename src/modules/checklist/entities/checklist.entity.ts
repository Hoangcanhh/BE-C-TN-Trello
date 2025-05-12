import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Card } from '../../card/entities/card.entity';

@Entity('checklist')
export class Checklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Card, { onDelete: 'CASCADE' })
  card: Card;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('checklist_item')
export class ChecklistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Checklist, { onDelete: 'CASCADE' })
  checklist: Checklist;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}