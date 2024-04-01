import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("Product A", 100);

describe("Unit test for updating product use case", () => {
  it("should update a product", async () => {
    // Given
    const productRepository = {
      create: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      update: jest.fn(),
    };
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const input = {
      id: product.id,
      name: "Product A Updated",
      price: 200,
    };
    // When
    const output = await updateProductUseCase.execute(input);
    // Then
    expect(output).toEqual(input);
  });
});
