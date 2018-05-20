import { HotWaterSource } from './core/HotWaterSource';
import { Pollable } from './Pollable';
import { CoffeeMakerAPI } from './core/CoffeeMakerAPI';

export class M4HotWaterSource extends HotWaterSource implements Pollable {
  private api: CoffeeMakerAPI;

  constructor(api: CoffeeMakerAPI) {
    super();
    this.api = api;
  }

  poll(): void {
    const boilerStatus = this.api.getBoilerStatus();
    if (this.isBrewing) {
      if (boilerStatus == CoffeeMakerAPI.BOILER_EMPTY) {
        this.api.setBoilerState(CoffeeMakerAPI.BOILER_OFF);
        this.api.setReliefValveState(CoffeeMakerAPI.VALVE_CLOSE);
        this.declareDone();
      }
    }
  }

  isReady(): boolean {
    const boilerStatus = this.api.getBoilerStatus();
    return boilerStatus === CoffeeMakerAPI.BOILER_NOT_EMPTY;
  }

  startBrewing(): void {
    this.api.setReliefValveState(CoffeeMakerAPI.VALVE_CLOSE);
    this.api.setBoilerState(CoffeeMakerAPI.BOILER_ON);
  }

  pause(): void {
    this.api.setBoilerState(CoffeeMakerAPI.BOILER_OFF);
    this.api.setReliefValveState(CoffeeMakerAPI.VALVE_OPEN);
  }

  resume(): void {
    this.api.setBoilerState(CoffeeMakerAPI.BOILER_ON);
    this.api.setReliefValveState(CoffeeMakerAPI.VALVE_CLOSE);
  }
}
