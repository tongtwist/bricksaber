import { HitEvent } from "../../types"

export interface IObstacle {
  handleHit(hit: HitEvent): void
}
