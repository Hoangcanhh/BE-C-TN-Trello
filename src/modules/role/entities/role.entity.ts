import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn({ name: 'permission_id' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}

@Entity('accesscontrol')
export class AccessControl {
  @PrimaryGeneratedColumn({ name: 'accesscontrol_id' })
  id: number;

  @Column()
  role_id: number;

  @Column()
  permission_id: number;
}