import { Pollable } from './Pollable';
import { CoffeeMakerAPI } from './core/CoffeeMakerAPI';
import { UserInterface } from './core/UserInterface';

export class M4UserInterface extends UserInterface implements Pollable {
  private api: CoffeeMakerAPI;

  constructor(api: CoffeeMakerAPI) {
    super();
    this.api = api;
  }

  poll(): void {
    const buttonStatus = this.api.getBrewButtonStatus();
    if (buttonStatus === CoffeeMakerAPI.BREW_BUTTON_PUSHED) {
      this.startBrewing();
    }
  }

  completeCycle(): void {
    this.api.setIndicatorState(CoffeeMakerAPI.INDICATOR_OFF);
  }

  done(): void {
    this.api.setIndicatorState(CoffeeMakerAPI.INDICATOR_ON);
  }
}
