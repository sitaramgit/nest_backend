import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { productDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService, private readonly mailerService: MailerService) {}

    @Get('sendmail')
    async sendEmail() {

       const mails = await this
        .mailerService
        .sendMail({
          to: 'sitaramkudireddy@gmail.com', // list of receivers
          from: 'sitaramkudireddyvtiger@gmail.com', // sender address
          subject: 'Testing Nest MailerModule ✔', // Subject line
          text: 'welcome', // plaintext body
          html: `<b>welcome to the gmail sitaram</b> ${new Date()}`, // HTML body content
        })
        .then((res) => {console.log(res)})
        .catch((err) => {console.log(err)});
        // return mails;
        return {
            statusCode: HttpStatus.OK,
            message: 'mail send successfully',
            data: {mails},
          };
        // console.log(mails);
    }

    @Get()
    async getAll() {

       const mails = await this
        .mailerService
        .sendMail({
          to: 'sitaramkudireddy@gmail.com', // list of receivers
          from: 'sitaramkudireddyvtiger@gmail.com', // sender address
          subject: 'Testing Nest MailerModule ✔', // Subject line
          text: 'welcome', // plaintext body
          html: '<b>welcome to the gmail sitaram</b>', // HTML body content
        })
        .then((res) => {console.log(res)})
        .catch((err) => {console.log(err)});
        console.log(mails);
        // return mails;
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
