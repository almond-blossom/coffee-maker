import assert = require('assert');
import { M4UserInterface } from '../src/M4UserInterface';
import { M4HotWaterSource } from '../src/M4HotWaterSource';
import { M4ContainmentVessel } from '../src/M4ContainmentVessel';
import { CoffeeMakerStub } from './CoffeeMakerStub';

var api: CoffeeMakerStub;
var ui: M4UserInterface;
var hws: M4HotWaterSource;
var cv: M4ContainmentVessel;

function beforeTest() {
  api = new CoffeeMakerStub();
  ui = new M4UserInterface(api);
  hws = new M4HotWaterSource(api);
  cv = new M4ContainmentVessel(api);

  ui.init(hws, cv);
  hws.init(ui, cv);
  cv.init(ui, hws);
}

function poll() {
  ui.poll();
  hws.poll();
  cv.poll();
}

(function testInitialConditions() {
  beforeTest();
  poll();
  assert(api.boilerOn == false);
  assert(api.lightOn == false);
  assert(api.plateOn == false);
  assert(api.valveClosed == true);
})();

(function testStartNoPot() {
  beforeTest();
  poll();
  api.buttonPressed = true;
  api.potPresent = false;
  poll();
  assert(api.boilerOn == false);
  assert(api.lightOn == false);
  assert(api.plateOn == false);
  assert(api.valveClosed == true);
})();

(function testStartNoWater() {
  beforeTest();
  poll();
  api.buttonPressed = true;
  api.boilerEmpty = true;
  poll();
  assert(api.boilerOn == false);
  assert(api.lightOn == false);
  assert(api.plateOn == false);
  assert(api.valveClosed == true);
})();

function normalStart() {
  poll();
  api.boilerEmpty = false;
  api.buttonPressed = true;
  poll();
}

(function testGoodStart() {
  beforeTest();
  normalStart();
  assert(api.boilerOn == true);
  assert(api.lightOn == false);
  assert(api.plateOn == false);
  assert(api.valveClosed == true);
})();

(function testStartedPotNotEmpty() {
  beforeTest();
  normalStart();
  api.potNotEmpty = true;
  poll();
  assert(api.boilerOn == true);
  assert(api.lightOn == false);
  assert(api.plateOn == true);
  assert(api.valveClosed == true);
})();

(function testPotRemovedAndReplacedWhileEmpty() {
  beforeTest();
  normalStart();
  api.potPresent = false;
  poll();
  assert(api.boilerOn == false);
  assert(api.lightOn == false);
  assert(api.plateOn == false);
  assert(api.valveClosed == false);
  api.potPresent = true;
  poll();
  assert(api.boilerOn == true);
  assert(api.lightOn == false);
  assert(api.plateOn == false);
  assert(api.valveClosed == true);
})();

function normalFill() {
  normalStart();
  api.potNotEmpty = true;
  poll();
}

(function testPotRemovedWhileNotEmptyAndReplacedEmpty() {
  beforeTest();
  normalFill();
  api.potPresent = false;
  poll();
  assert(api.boilerOn == false);
  assert(api.lightOn == false);
  assert(api.plateOn == false);
  assert(api.valveClosed == false);
  api.potPresent = true;
  api.potNotEmpty = false;
  poll();
  assert(api.boilerOn == true);
  assert(api.lightOn == false);
  assert(api.plateOn == false);
  assert(api.valveClosed == true);
})();

(function testPotRemovedWhileNotEmptyAndReplacedNotEmpty() {
  beforeTest();
  normalFill();
  api.potPresent = false;
  poll();
  api.potPresent = true;
  poll();
  assert(api.boilerOn == true);
  assert(api.lightOn == false);
  assert(api.plateOn == true);
  assert(api.valveClosed == true);
})();

function normalBrew() {
  normalFill();
  api.boilerEmpty = true;
  poll();
}

(function testBoilerEmptyPotNotEmpty() {
  beforeTest();
  normalBrew();
  assert(api.boilerOn == false);
  assert(api.lightOn == true);
  assert(api.plateOn == true);
  assert(api.valveClosed == true);
})();

(function testBoilerEmptiesWhilePotRemoved() {
  normalFill();
  api.potPresent = false;
  poll();
  api.boilerEmpty = true;
  poll();
  assert(api.boilerOn == false);
  assert(api.lightOn == true);
  assert(api.plateOn == false);
  assert(api.valveClosed == true);
  api.potPresent = true;
  poll();
  assert(api.boilerOn == false);
  assert(api.lightOn == true);
  assert(api.plateOn == true);
  assert(api.valveClosed == true);
})();

(function testEmptyPotReturnedAfter() {
  normalBrew();
  api.potNotEmpty = false;
  poll();
  assert(api.boilerOn == false);
  assert(api.lightOn == false);
  assert(api.plateOn == false);
  assert(api.valveClosed == true);
})();
