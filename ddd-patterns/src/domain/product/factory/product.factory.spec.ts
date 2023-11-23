import ProductFactory from "./product.factory";

describe("Product Factory", () => {
  it("should create a product", () => {
    const product = ProductFactory.create("a", "Product A", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create("b", "Product B", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when product type is not supported", () => {
    expect(() => ProductFactory.create("c", "Product C", 100)).toThrowError(
      "Product type not supported"
    );
  });
});
