import { Column, Entity, PrimaryColumn, Timestamp } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: string;

  @Column()
  created_at: Timestamp;

  @Column()
  updated_at: Timestamp;
}
