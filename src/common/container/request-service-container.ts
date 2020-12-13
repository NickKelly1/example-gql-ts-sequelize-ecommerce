import { BaseContext } from "../contexts/base-context";
import { createCategoryLoader, ICategoryLoader } from "../../category/category.loader";
import { CategoryPolicy } from "../../category/category.policy";
import { CategoryRepository } from "../../category/category.repository";
import { CategoryService } from "../../category/category.service";
import { createProductLoader, IProductLoader } from "../../product/product.loader";
import { ProductPolicy } from "../../product/product.policy";
import { ProductRepository } from "../../product/product.repository";
import { ProductService } from "../../product/product.service";



/**
 * Services bound to a request
 */
export class RequestServiceContainer {
  // category
  public readonly categoryService: CategoryService;
  public readonly categoryPolicy: CategoryPolicy;
  public readonly categoryRepository: CategoryRepository;
  public readonly categoryLoader: ICategoryLoader;

  // product
  public readonly productService: ProductService;
  public readonly productPolicy: ProductPolicy;
  public readonly productRepository: ProductRepository;
  public readonly productLoader: IProductLoader;

  constructor(
    protected readonly ctx: BaseContext,
  ) {
    // category
    this.categoryService = new CategoryService(ctx);
    this.categoryPolicy = new CategoryPolicy(ctx);
    this.categoryRepository = new CategoryRepository(ctx);
    this.categoryLoader = createCategoryLoader(ctx);

    // product
    this.productService = new ProductService(ctx);
    this.productPolicy = new ProductPolicy(ctx);
    this.productRepository = new ProductRepository(ctx);
    this.productLoader = createProductLoader(ctx);
  }

  // get universal(): UniversalServiceContainer {
  //   return this.ctx.universal;
  // }
} 
