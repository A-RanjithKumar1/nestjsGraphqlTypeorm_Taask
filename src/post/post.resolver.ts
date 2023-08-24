import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.createPost(createPostInput);
  }

  @Query(() => [Post])
  findAllPosts() {
    return this.postService.findAllPosts();
  }

  @Query(() => Post)
  findPostById(@Args('postid') postid: number) {
    return this.postService.findPostById(postid);
  }

  @Mutation(() => String)
  updatePostById(
    @Args('updatePostInput') updatePostInput: CreatePostInput,
    @Args('postid') postid: number,
  ) {
    return this.postService.updatePostById(postid, updatePostInput);
  }

  @Mutation(() => String)
  deletePostById(@Args('postid') postid: number) {
    return this.postService.deletePostById(postid);
  }
}
