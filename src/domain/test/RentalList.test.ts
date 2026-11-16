import { describe, expect, test, beforeEach } from "vitest";
import { Rental } from "../Rental.ts";
import { RentalList } from "../RentalList.ts";

describe("RentalList", () => {
  let list: RentalList;
  let rental: Rental;

  beforeEach(() => {
    list = new RentalList();
    rental = new Rental({
      customer: "Juan Gómez",
      bikeCode: "B-123",
      bikeType: "urban",
      hours: 3,
      pricePerHour: 100,
    });
  });

  test("Create an empty rental list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a rental", () => {
    list.add(rental);
    expect(list.getItems()).toEqual([rental]);
  });

  test("remove a rental by bike code", () => {
    list.add(rental);

    list.remove("B-123");

    expect(list.getItems()).toEqual([]);
  });

  test("reject removing a bike that is not rented", () => {
    expect(() => list.remove("B-123")).toThrow();
  });

  test("reject a bike that is already rented", () => {
    list.add(rental);
    expect(() => list.add(rental)).toThrow();
  });

  test("filter rentals by type", () => {
    list.add(rental);
    expect(list.getByType("urban")).toEqual([rental]);
    expect(list.getByType("electric")).toEqual([]);
  });

  test("total income", () => {
    list.add(rental);
    expect(list.totalIncome()).toBe(300);
  });

  test("total late fees", () => {
    rental.lateHours = 2;
    list.add(rental);
    expect(list.totalLateFees()).toBe(400);
    expect(rental.cost()).toBe(300);
    expect(list.totalIncome()).toBe(300);
  });

  test("return zero late fees when there are no delays", () => {
    list.add(rental);
    expect(list.totalLateFees()).toBe(0);
  });

  test("sum late fees for all rentals", () => {
    rental.lateHours = 2;
    list.add(rental);

    const secondRental = new Rental({
      customer: "Ana Pérez",
      bikeCode: "B-456",
      bikeType: "electric",
      hours: 2,
      pricePerHour: 150,
      lateHours: 1,
    });
    list.add(secondRental);

    expect(list.totalLateFees()).toBe(700);
  });
});
