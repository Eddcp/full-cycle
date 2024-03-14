import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerFactory from "../factory/customer.factory";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-has-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendLog1WhenCustomerIsCreatedHandler from "./handler/send-log-1-when-customer-is-created.handler";
import SendLog2WhenCustomerIsCreatedHandler from "./handler/send-log-2-when-customer-is-created.handler";
import SendMessageWhenCustomerAddressHasChangedHandler from "./handler/send-message-when-customer-address-has-changed.handler";

describe("Customer Events", () => {
  it("should log 1 and 2 when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendLog2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
      name: "Customer 1",
    });

    jest.spyOn(console, "log");

    eventDispatcher.notify(customerCreatedEvent);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      "Esse é o segundo console.log do evento: CustomerCreated"
    );
  });

  it("should log when address has been changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerAddressHasChangedHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const address = new Address("1st Street", 2, "12345-78", "Some place");
    const customer = CustomerFactory.createWithAddress("John Doe", address);
    const newAddress = new Address(
      "2nd Street",
      3,
      "12345-78",
      "Another place"
    );
    customer.changeAddress(newAddress);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer
    );

    jest.spyOn(console, "log");

    eventDispatcher.notify(customerAddressChangedEvent);
    expect(console.log).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer?.id}, ${customer?.name} alterado para ${newAddress}`
    );
  });
});
