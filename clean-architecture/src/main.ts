import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/order/entity/order";
import OrderItem from "./domain/checkout/order/entity/order-item";
import Address from "./domain/customer/value-object/address";

let customer = new Customer("123", "John Doe");
const address = new Address("1st Street", 2, "12345-78", "Some place");
customer.Address = address;
customer.activate();

const item = new OrderItem("1", "Item 1", 10, "p1", 100);
const order = new Order("1", "123", [item]);
