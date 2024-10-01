import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postModel: typeof Post){}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all post`;
  }

  async findById(id: string) {
    let post = this.postModel.findByPk(id)
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
