import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('label')
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('card_label')
export class CardLabel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  card_id: number;

  @Column()
  label_id: number;
}