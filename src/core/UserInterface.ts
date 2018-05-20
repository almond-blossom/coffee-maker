import { HotWaterSource } from './HotWaterSource';
import { ContainmentVessel } from './ContainmentVessel';

export abstract class UserInterface {
  private hws: HotWaterSource;
  private cv: ContainmentVessel;
  protected isComplete: boolean;

  constructor() {
    this.isComplete = true;
  }

  abstract completeCycle(): void;
  abstract done(): void;

  init(hws: HotWaterSource, cv: ContainmentVessel): void {
    this.hws = hws;
    this.cv = cv;
  }

  protected startBrewing() {
    if (this.hws.isReady() && this.cv.isReady()) {
      this.isComplete = false;
      this.hws.start();
      this.cv.start();
    }
  }

  complete() {
    this.isComplete = true;
    this.completeCycle();
  }
}