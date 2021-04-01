import { EntityRepository, Repository } from "typeorm";
import { ProductEntity } from "./product.entity";

@EntityRepository(ProductEntity)
export class productRepository extends Repository<ProductEntity> {
}