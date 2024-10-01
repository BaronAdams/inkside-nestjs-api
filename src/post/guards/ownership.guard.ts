import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PostService } from '../post.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Extracted from JWT strategy
    const postId = request.params.id;

    const post = await this.postService.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    if (post.userId !== user.id) {
      throw new UnauthorizedException('You are not allowed to modify or delete this post');
    }
    return true;
  }
}
