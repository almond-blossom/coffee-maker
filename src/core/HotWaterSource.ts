import { UserInterface } from './UserInterface';
import { ContainmentVessel } from './ContainmentVessel';

export abstract class HotWaterSource {
  private ui: UserInterface;
  private cv: ContainmentVessel;
  protected isBrewing: boolean;

  constructor() {
    this.isBrewing = false;
  }

  abstract isReady(): boolean;
  abstract startBrewing(): void;
  abstract pause(): void;
  abstract resume(): void;

  init(ui: UserInterface, cv: ContainmentVessel): void {
    this.ui = ui;
    this.cv = cv;
  }

  start(): void {
    this.isBrewing = true;
    this.startBrewing();
  }

  done(): void {
    this.isBrewing = false;
  }

  declareDone(): void {
    this.ui.done();
    this.cv.done();
    this.isBrewing = false;
  }
}