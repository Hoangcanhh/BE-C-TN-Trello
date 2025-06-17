import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Column as BoardColumn } from "../../column/entities/column.entities"
import { User } from "../../user/entities/user.entity"
import { List } from "../../list/entities/list.entity"

@Entity("boards")
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 100, nullable: false })
  title: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ name: "owner_id" })
  ownerId: number

  @Column({ name: "background_color", length: 50, nullable: true })
  backgroundColor: string

  @Column({ name: "background_image", nullable: true })
  backgroundImage: string

  @Column({ default: false })
  starred: boolean

  @Column({ default: true })
  active: boolean

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: "owner_id" })
  owner: User

  @OneToMany(
    () => BoardColumn,
    (column) => column.board,
    { cascade: true },
  )
  columns: BoardColumn[]

  @OneToMany(
    () => List,
    (list) => list.board,
    { cascade: true },
  )
  lists: List[]
}
