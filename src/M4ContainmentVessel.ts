import { ContainmentVessel } from './core/ContainmentVessel';
import { Pollable } from './Pollable';
import { CoffeeMakerAPI } from './core/CoffeeMakerAPI';

export class M4ContainmentVessel extends ContainmentVessel implements Pollable {
  private api: CoffeeMakerAPI;
  private lastPotStatus: number;

  constructor(api: CoffeeMakerAPI) {
    super();
    this.api = api;
    this.lastPotStatus = CoffeeMakerAPI.POT_EMPTY;
  }

  private handleBrewingEvent(potStatus: number): void {
    if (potStatus === CoffeeMakerAPI.POT_NOT_EMPTY) {
      this.containerAvailable();
      this.api.setWarmerState(CoffeeMakerAPI.WARMER_ON);
    } else if (potStatus === CoffeeMakerAPI.WARMER_EMPTY) {
      this.containerUnavailable();
      this.api.setWarmerState(CoffeeMakerAPI.WARMER_OFF);
    } else {
      this.containerAvailable();
      this.api.setWarmerState(CoffeeMakerAPI.WARMER_OFF);
    }
  }

  private handleIncompleteEvent(potStatus: number): void {
    if (potStatus === CoffeeMakerAPI.POT_NOT_EMPTY) {
      this.api.setWarmerState(CoffeeMakerAPI.WARMER_ON);
    } else if (potStatus === CoffeeMakerAPI.WARMER_EMPTY) {
      this.api.setWarmerState(CoffeeMakerAPI.WARMER_OFF);
    } else {
      this.api.setWarmerState(CoffeeMakerAPI.WARMER_OFF);
      this.declareComplete();
    }
  }

  isReady(): boolean {
    const plateStatus = this.api.getWarmerPlateStatus();
    return plateStatus === CoffeeMakerAPI.POT_EMPTY;
  }

  poll(): void {
    const potStatus = this.api.getWarmerPlateStatus();
    if (potStatus === this.lastPotStatus) {
      if (this.isBrewing) {

      }
    }
  }
}
