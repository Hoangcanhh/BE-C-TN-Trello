import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}

@Entity('accesscontrol')
export class AccessControl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_id: number;

  @Column()
  permission_id: number;
}