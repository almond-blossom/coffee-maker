import { UserInterface } from './UserInterface';
import { HotWaterSource } from './HotWaterSource';

export abstract class ContainmentVessel {
  private ui: UserInterface;
  private hws: HotWaterSource;
  protected isBrewing: boolean;
  protected isComplete: boolean;

  constructor() {
    this.isBrewing = false;
    this.isComplete = true;
  }

  abstract isReady(): boolean;

  protected declareComplete() {
    this.isComplete = true;
    this.ui.complete();
  }

  protected containerAvailable() {
    this.hws.resume();
  }

  protected containerUnavailable() {
    this.hws.pause();
  }

  init(ui: UserInterface, hws: HotWaterSource): void {
    this.ui = ui;
    this.hws = hws;
  }

  start(): void {
    this.isBrewing = true;
    this.isComplete = false;
  }

  done() {
    this.isBrewing = false;
  }
}
