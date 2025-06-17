import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Column as BoardColumn } from "../../column/entities/column.entities"
import { List } from "../../list/entities/list.entity"

@Entity("cards")
export class Card {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255, nullable: false })
  title: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({
    type: "enum",
    enum: ["blocker", "discussion", "fyi", "paused", "goal"],
    default: "goal",
  })
  type: "blocker" | "discussion" | "fyi" | "paused" | "goal"

  @Column({ default: 0 })
  count: number

  @Column({ name: "column_id" })
  columnId: number

  @Column({ default: 0 })
  position: number

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @ManyToOne(
    () => BoardColumn,
    (column) => column.cards,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "column_id" })
  column: BoardColumn

  @ManyToOne(
    () => List,
    (list) => list.cards,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "list_id" })
  list: List
}
