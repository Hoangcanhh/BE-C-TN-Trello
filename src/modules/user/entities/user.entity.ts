import { StatusEnum } from '../../../enum/status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

   @Column({nullable: true})
  full_name: string;

  @Column({ nullable: true })
  date_of_birth: string;

  @Column({nullable: true })
  occupation: string;

  @Column({ nullable: true })
  avatar: string

  @Column({ name: "google_id", nullable: true })
  googleId: string

  @Column({ name: "is_google_user", default: false })
  isGoogleUser: boolean

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
