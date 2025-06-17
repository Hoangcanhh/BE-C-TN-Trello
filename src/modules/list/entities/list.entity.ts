import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { Board } from "../../board/entities/board.entity"
import { Card } from "../../card/entities/card.entity"

@Entity("lists")
export class List {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 100, nullable: false })
  title: string

  @Column({ name: "board_id" })
  boardId: string

  @Column({ default: 0 })
  position: number

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @ManyToOne(
    () => Board,
    (board) => board.lists,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "board_id" })
  board: Board

  @OneToMany(
    () => Card,
    (card) => card.list,
    { cascade: true },
  )
  cards: Card[]
}
