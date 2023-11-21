import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/customer.model";
import CustomerRepository from "../customer/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import ProductModel from "../product/product.model";
import ProductRepository from "../product/product.repository";
import Product from "../../../domain/product/entity/product";
import OrderItem from "../../../domain/order/entity/order-item";
import Order from "../../../domain/order/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const productOneQuantity = 2;
    const productTwoQuantity = 5;
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      productOneQuantity
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const orderModel = await OrderModel.findOne({ where: { id: "123" } });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: product.price * productOneQuantity,
    });

    const anotherItem = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      productTwoQuantity
    );
    order.addItem(anotherItem);

    await orderRepository.update(order);
    const updatedOrderModel = await OrderModel.findOne({
      where: { id: "123" },
    });

    // Assert
    expect(updatedOrderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total:
        product.price * productOneQuantity + product.price * productTwoQuantity,
    });
  });
});
