class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(carDetails) {
    this.#brand = carDetails.brand
    this.#model = carDetails.model
    this.speed = carDetails.speed
    this.isTrunkOpen = carDetails.isTrunkOpen
  }

  displayInfo() {
    return console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Is the trunk open: ${this.isTrunkOpen}`)
  }

  go() {
    if (this.speed === 200 || this.isTrunkOpen) {
      return
    }
    return this.speed += 5
  }

  brake() {
    if (this.speed === 0) {
      return
    }
    return this.speed -= 5
  }

  openTrunk() {
    if (this.speed > 0) {
      return
    }
    return this.isTrunkOpen = true
  }

  closeTrunk() {
    return this.isTrunkOpen = false
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails)
    this.acceleration = carDetails.acceleration
  }

  go() {
    if (this.speed === 300 || this.isTrunkOpen) {
      return
    }
    return this.speed += this.acceleration
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla',
  speed: 0,
  isTrunkOpen: false
})

const car2 = new Car({
  brand: 'Tesla', 
  model: 'Model 3', 
  speed: 0,
  isTrunkOpen: false
})

const raceCar = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  speed: 0,
  isTrunkOpen: false,
  acceleration: 20,
})

car1.displayInfo()
car2.displayInfo()

raceCar.go()
raceCar.displayInfo()