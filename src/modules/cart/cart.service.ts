import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { CreateCartDto, GetCartDto, UpdateCartDto } from './dto/cart.dto';
import { User, UserDocument } from '../user/user.schema';
import { Product, ProductDocument } from '../product/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(payload: CreateCartDto): Promise<Cart> {
    const cart = await this.cartModel.create({
      ...payload,
    });

    if (!cart) {
      console.log(cart);
      throw new NotFoundException('Error in creating cart, please try again.');
    }

    return cart;
  }

  async getCartById(payload: GetCartDto) {
    const { id } = payload;

    return await this.cartModel.findById(id);
  }

  async getCartByWalletAddress(walletAddress: string) {
    console.log(walletAddress, 'stuff')
    return await this.cartModel.findOne({ walletAddress });
  }

  async getAllProducts(payload: GetCartDto) {
    const { id } = payload;

    const cart = await this.cartModel.findById(id).populate('products');

    return cart.items;
  }

  async findOne(id: string): Promise<Cart> {
    return await this.cartModel.findById(id).populate('products');
  }

  async update(id: string, payload: UpdateCartDto): Promise<Cart> {
    return await this.cartModel.findByIdAndUpdate(
      id,
      { $Push: { products: payload } },
      {
        new: true,
      },
    );
  }

  async delete(id: string): Promise<Cart> {
    return await this.cartModel.findByIdAndDelete(id);
  }
}
