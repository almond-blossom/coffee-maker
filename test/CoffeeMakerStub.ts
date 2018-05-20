import { CoffeeMakerAPI } from '../src/core/CoffeeMakerAPI';

export class CoffeeMakerStub extends CoffeeMakerAPI {
  buttonPressed: boolean;
  lightOn: boolean;
  boilerOn: boolean;
  valveClosed: boolean;
  plateOn: boolean;
  boilerEmpty: boolean;
  potPresent: boolean;
  potNotEmpty: boolean;

  constructor() {
    super();
    this.buttonPressed = false;
    this.lightOn = false;
    this.boilerOn = false;
    this.valveClosed = true;
    this.plateOn = false;
    this.boilerEmpty = true;
    this.potPresent = true;
    this.potNotEmpty = false;
  }

  getWarmerPlateStatus(): number {
    if (!this.potPresent) {
      return CoffeeMakerAPI.WARMER_EMPTY;
    } else if (this.potNotEmpty) {
      return CoffeeMakerAPI.POT_NOT_EMPTY;
    } else {
      return CoffeeMakerAPI.POT_EMPTY;
    }
  }

  getBoilerStatus(): number {
    return this.boilerEmpty ?
      CoffeeMakerAPI.BOILER_EMPTY
      : CoffeeMakerAPI.BOILER_NOT_EMPTY;
  }

  getBrewButtonStatus(): number {
    if (this.buttonPressed) {
      this.buttonPressed = false;
      return CoffeeMakerAPI.BREW_BUTTON_PUSHED;
    } else {
      return CoffeeMakerAPI.BREW_BUTTON_NOT_PUSHED;
    }
  }

  setBoilerState(boilerStatus: number): void {
    this.boilerOn = boilerStatus === CoffeeMakerAPI.BOILER_ON;
  }

  setWarmerState(warmerStatus: number): void {
    this.plateOn = warmerStatus === CoffeeMakerAPI.WARMER_ON;
  }

  setIndicatorState(indicatorState: number): void {
    this.lightOn = indicatorState === CoffeeMakerAPI.INDICATOR_ON;
  }

  setReliefValveState(reliefValveState: number): void {
    this.valveClosed = reliefValveState === CoffeeMakerAPI.VALVE_CLOSE;
  }
}
