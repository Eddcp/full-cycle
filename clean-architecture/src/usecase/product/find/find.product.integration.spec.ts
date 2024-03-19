import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/repository/product/product.model";
import ProductRepository from "../../../infrastructure/repository/product/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

describe("Integration test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const productFindUseCase = new FindProductUseCase(productRepository);

    let product: Product;

    product = ProductFactory.create("Product A", 100);

    await productRepository.create(product);
    const output = await productFindUseCase.execute({
      id: product.id,
    });
    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
});
