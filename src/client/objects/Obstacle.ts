import { HitEvent } from "../types";

export default interface IObstacle {
  handleHit(hit: HitEvent): void;
}
