// trello-backend/src/modules/team/team.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Workspace, { nullable: true, onDelete: 'SET NULL' })
  workspace: Workspace;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('team_member')
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  team_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}