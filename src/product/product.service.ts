import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { productDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';
import { productRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private productRepository: productRepository
    ) {  }

  async getAll(): Promise<ProductEntity[]>{
        const list = await this.productRepository.find();
        if(!list.length) {
            throw new NotFoundException({message: 'product list not availble'})
        }
        return list;
    }

    async findById(id: number): Promise<ProductEntity[]>{
        const product: any = await this.productRepository.findOne(id);
        if(!product) {
            throw new NotFoundException({message: 'not existed'});
        }
        return product;
    }

    async findByName(name: string): Promise<ProductEntity[]>{
        const product: any = await this.productRepository.findOne({name: name});
        return product;
    }

    async create(dto: productDto): Promise<any> {
        console.log(dto)
        const product = this.productRepository.create(dto);
        await this.productRepository.save(product);
        return {message: 'created'};
    }

    async update(id: number, dto: productDto): Promise<any> {
        const product: any = this.findById(id);
        dto.name ? product.name = dto.name : product.name = product.name;
        dto.price ? product.price = dto.price : product.price = product.price;
        await this.productRepository.save(product);
        return {message: 'product updated'};
    }

    async delete(id: number): Promise<any> {
        const product: any = this.findById(id);
        await this.productRepository.delete(product);
        return {message: 'product deleted'};
    }
}
