export class CardDto {
  id: number
  title: string
  description: string
  type: "blocker" | "discussion" | "fyi" | "paused" | "goal"
  count: number
  columnId: number
  position: number
  createdAt: Date
  updatedAt: Date
}
