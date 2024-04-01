import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/repository/product/product.model";
import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/repository/product/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Integration test for updating product use case", () => {
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

  it("should update a product", async () => {
    // Arrange
    const product = {
      name: "Product A",
      price: 100,
    };
    const productRepository = new ProductRepository();

    //Act
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const createdProduct = await createProductUseCase.execute(product);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const input = {
      id: createdProduct.id,
      name: "Product A updated",
      price: 200,
    };
    const output = await updateProductUseCase.execute(input);

    // Assert
    expect(output.id).toEqual(input.id);
    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(input.price);
  });
});
