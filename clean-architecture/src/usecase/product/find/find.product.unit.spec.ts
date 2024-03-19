import FindProductUseCase from "./find.product.usecase";

const product = {
  id: "1",
  name: "Product A",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const productFindUseCase = new FindProductUseCase(productRepository);
    const output = await productFindUseCase.execute({
      id: "1",
    });
    expect(output).toEqual({
      id: "1",
      name: "Product A",
      price: 100,
    });
  });

  it("should thrown an error when id is missing", async () => {
    const productRepository = MockRepository();
    const productFindUseCase = new FindProductUseCase(productRepository);
    await expect(productFindUseCase.execute({ id: "" })).rejects.toThrow(
      "Id is required"
    );
  });

  it("should thrown an error when product is not found", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const productFindUseCase = new FindProductUseCase(productRepository);

    expect(() => {
      return productFindUseCase.execute({ id: "1" });
    }).rejects.toThrow("Product not found");
  });
});
