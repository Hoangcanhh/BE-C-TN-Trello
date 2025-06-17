import { CardDto } from "./card.dto"

export class CardResponseDto {
  status: string
  message: string
  data: CardDto
}

export class CardsResponseDto {
  status: string
  message: string
  data: CardDto[]
}
