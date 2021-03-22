import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { productDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async getAll() {
        return await this.productService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
       return await this.productService.findById(id);
    }


    @Post()
    async create(@Body() dto: productDto){
        console.log(dto);
        return await this.productService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto:productDto) {
        return await this.productService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number) {
        return await this.productService.delete(id);
    }
}
