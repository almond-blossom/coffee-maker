export abstract class CoffeeMakerAPI {
  static api: CoffeeMakerAPI = null;

  abstract getWarmerPlateStatus(): number;
  static WARMER_EMPTY = 0;
  static POT_EMPTY = 1;
  static POT_NOT_EMPTY = 2;

  abstract getBoilerStatus(): number;
  static BOILER_EMPTY = 0;
  static BOILER_NOT_EMPTY = 1

  abstract getBrewButtonStatus(): number;
  static BREW_BUTTON_PUSHED = 0;
  static BREW_BUTTON_NOT_PUSHED = 1;

  abstract setBoilerState(boilerStatus: number): void;
  static BOILER_ON = 0;
  static BOILER_OFF = 1;

  abstract setWarmerState(warmerStatus: number): void;
  static WARMER_ON = 0;
  static WARMER_OFF = 1;

  abstract setIndicatorState(indicatorState: number): void;
  static INDICATOR_ON = 0;
  static INDICATOR_OFF = 1;

  abstract setReliefValveState(reliefValveState: number): void;
  static VALVE_OPEN = 0;
  static VALVE_CLOSE = 1;
}
