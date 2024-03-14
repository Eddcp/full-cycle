import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("1st Street", 2, "12345-78", "Some place");
    const customer = CustomerFactory.createWithAddress("John Doe", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.Address).toBeDefined();
    expect(customer.Address.street).toBe("1st Street");
    expect(customer.Address.number).toBe(2);
    expect(customer.Address.zip).toBe("12345-78");
    expect(customer.Address.city).toBe("Some place");
  });
});
