"use strict";
const assert = require("assert");

// This is an object that has types of jobs and the values each provide.
const jobTypes = {
  pilot: "MAV",
  mechanic: "Repair Ship",
  commander: "Main Ship",
  programmer: "Any Ship!",
};

// Your code will go here

// Looking at the tests, there are two classes. CrewMember & Ship
// CrewMembers need a name, job, & special skill. Crew Members need to be able to enter a ship.
class CrewMember {
  constructor(name, job, specialSkill) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    // Ship is null because there is no value until the crew member is placed in a ship.
    this.ship = null;
  }
  //Takes the parameter of ship and assigns the crewMember to the ship
  enterShip(ship) {
    // function changes crewMember ship value of null to the declared value
    this.ship = ship;
    //.push used to push the crew into the ship array.
    ship.crew.push(this);
  }
}
// Ship class needs to have a name, type, & ability. They need a crew to operate.
class Ship {
  constructor(name, type, ability) {
    this.name = name;
    this.type = type;
    this.ability = ability;
    // Crew is labeled as an empty array so that crew members can be added.
    this.crew = [];
  }
  // ship Crew begins as empty until assigned. In the test it shows that if there is an empty crew, state: "Can't perform a mission yet." There is a condition in the test to return the ability as the mission statement. The mav ability is "Ascend into low orbit" or "Interplanetary Space Travel".

  // Mission statement function in the ship class.
  missionStatement() {
    //This will return the value of "Can't perform a mission yet." when there is no crew members on the ship.
    if (this.crew.length === 0) {
      return "Can't perform a mission yet.";
    } else {
      // If false and there are crew members, then the mission statement will print, which is the ability.
      return this.ability;
    }
  }
}

// Begin by reading the tests and building a function that will full each one.
// As you build, you might not have to build them in order, maybe you do...
// These are the tests
if (typeof describe === "function") {
  // Test 1 Needs a class with a function allowing crew to enter ship.
  describe("CrewMember", function () {
    it("should have a name, a job, a specialSkill and ship upon instantiation", function () {
      // this creates a CrewMember and passes the following arguments into its constructor:
      // 'Rick Martinez', 'pilot', 'chemistry'
      const crewMember1 = new CrewMember("Rick Martinez", "pilot", "chemistry");
      assert.equal(crewMember1.name, "Rick Martinez");
      assert.equal(crewMember1.job, "pilot");
      assert.equal(crewMember1.specialSkill, "chemistry");
      assert.equal(crewMember1.ship, null);
    });

    it("can enter a ship", function () {
      // this creates a new Ship. Can you build a class that can be called so that this Ship can be built?
      let mav = new Ship("Mars Ascent Vehicle", "MAV", "Ascend into low orbit");
      const crewMember1 = new CrewMember("Rick Martinez", "pilot", "chemistry");
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });
  // Test 2 needs a class of ship with a function of missionStatement.
  // The ship needs a (name, type, ability) Crew length 0? so its empty?
  describe("Ship", function () {
    it("should have a name, a type, an ability and an empty crew upon instantiation", function () {
      let mav = new Ship("Mars Ascent Vehicle", "MAV", "Ascend into low orbit");
      assert.equal(mav.name, "Mars Ascent Vehicle");
      assert.equal(mav.type, "MAV");
      assert.equal(mav.ability, "Ascend into low orbit");
      assert.equal(mav.crew.length, 0);
    });

    it("can return a mission statement correctly", function () {
      let mav = new Ship("Mars Ascent Vehicle", "MAV", "Ascend into low orbit");
      const crewMember1 = new CrewMember("Rick Martinez", "pilot", "chemistry");
      let hermes = new Ship(
        "Hermes",
        "Main Ship",
        "Interplanetary Space Travel"
      );
      const crewMember2 = new CrewMember(
        "Commander Lewis",
        "commander",
        "geology"
      );
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");
      // It says to return "Ascend into low orbit" or "Interplanetary Space Travel". Found in ability of the ship.
      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
