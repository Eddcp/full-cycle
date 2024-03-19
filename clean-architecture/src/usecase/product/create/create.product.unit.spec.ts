import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const output = await productCreateUseCase.execute({
      name: "Product A",
      price: 100,
    });
    expect(output).toEqual({
      id: expect.any(String),
      name: "Product A",
      price: 100,
    });
  });
});
