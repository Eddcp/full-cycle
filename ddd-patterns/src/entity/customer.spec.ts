import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit test", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw an error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "13330-012", "Uberlândia");

    customer.Address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "Customer 123");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
