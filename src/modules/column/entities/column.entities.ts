import {
  Entity,
  Column as TypeOrmColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { Board } from "../../board/entities/board.entity"
import { Card } from "../../card/entities/card.entity"

@Entity("columns")
export class Column {
  @PrimaryGeneratedColumn()
  id: number

  @TypeOrmColumn({ length: 100, nullable: false })
  title: string

  @TypeOrmColumn({ name: "board_id" })
  boardId: string

  @TypeOrmColumn({ default: 0 })
  position: number

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @ManyToOne(
    () => Board,
    (board) => board.columns,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "board_id" })
  board: Board

  @OneToMany(
    () => Card,
    (card) => card.column,
    { cascade: true },
  )
  cards: Card[]
}
