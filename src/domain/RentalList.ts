import type { BikeType, Rental } from "./Rental.ts";

export class RentalList {
  #items: Rental[] = [];

  add(item: Rental): void {
    const exists = this.#items.some(
      (rental) => rental.bikeCode === item.bikeCode,
    );
    if (exists) {
      throw new Error("Esa bicicleta ya está alquilada.");
    }
    this.#items.push(item);
  }

  remove(bikeCode: string): void {
    const index = this.#items.findIndex((rental) => rental.bikeCode === bikeCode);
    if (index === -1) {
      throw new Error("No existe un alquiler para esa bicicleta.");
    }
    this.#items.splice(index, 1);
  }

  getItems(): readonly Rental[] {
    return [...this.#items];
  }

  getByType(type: BikeType): readonly Rental[] {
    return this.#items.filter((rental) => rental.bikeType === type);
  }

  totalIncome(): number {
    return this.#items.reduce((total, rental) => total + rental.cost(), 0);
  }

  totalLateFees(): number {
    return this.#items.reduce(
      (total, rental) =>
        total + rental.lateHours * rental.pricePerHour * 2,
      0,
    );
  }
}
