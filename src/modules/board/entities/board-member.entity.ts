import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Board } from "./board.entity"
import { User } from "../../user/entities/user.entity"

@Entity("board_members")
export class BoardMember {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "user_id" })
  userId: number

  @Column({ name: "board_id" })
  boardId: string

  @Column({
    type: "enum",
    enum: ["admin", "member", "observer"],
    default: "member",
  })
  role: "admin" | "member" | "observer"

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @ManyToOne(() => Board, { onDelete: "CASCADE" })
  @JoinColumn({ name: "board_id" })
  board: Board

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User
}
