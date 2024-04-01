import ListProductUseCase from "./list.product.usecase";

describe("Unit test list product use case", () => {
  it("should list a product", async () => {
    // Arrange
    const product1 = {
      id: "1",
      name: "Product A",
      price: 100,
    };
    const product2 = {
      id: "2",
      name: "Product B",
      price: 200,
    };
    const productRepository = {
      create: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
      update: jest.fn(),
    };
    // Act
    const listProductUseCase = new ListProductUseCase(productRepository);

    // Assert
    const output = await listProductUseCase.execute();
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
  });
});
