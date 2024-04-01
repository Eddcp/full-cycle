import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/repository/product/product.model";
import ListProductUseCase from "./list.product.usecase";
import ProductRepository from "../../../infrastructure/repository/product/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Integration test list product use case", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    // Arrange
    const productRepository = new ProductRepository();

    const product1 = {
      name: "Product A",
      price: 100,
    };
    const product2 = {
      name: "Product B",
      price: 200,
    };

    // Act
    const createProductUseCase = new CreateProductUseCase(productRepository);
    await createProductUseCase.execute(product1);
    await createProductUseCase.execute(product2);
    const listProductUseCase = new ListProductUseCase(productRepository);
    // Assert
    const output = await listProductUseCase.execute();
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toEqual(expect.any(String));
    expect(output.products[0].name).toEqual(product1.name);
    expect(output.products[0].price).toEqual(product1.price);
  });
});
