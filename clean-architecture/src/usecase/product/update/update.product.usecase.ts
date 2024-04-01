import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";

export default class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  public async execute(
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    const { id, name, price } = input;

    if (!id) {
      throw new Error("Id is required");
    }

    const product = await this.productRepository.find(id);

    product.changeName(name);
    product.changePrice(price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
