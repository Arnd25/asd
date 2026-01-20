import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import OrderService from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderPresenter } from './dto/order-presenter';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('order')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderPresenter,
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrderPresenter],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderPresenter,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderPresenter,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: OrderPresenter,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}

export default OrderController;
