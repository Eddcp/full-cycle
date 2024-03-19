import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/repository/product/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/repository/product/product.model";

describe("Integration test for product create use case", () => {
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

  it("should create a product", async () => {
    // Given
    const input = {
      name: "Product A",
      price: 100,
    };
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    // When
    const output = await createProductUseCase.execute(input);
    // Then
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
