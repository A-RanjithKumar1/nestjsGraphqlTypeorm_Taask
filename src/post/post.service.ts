import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly Postrepository: Repository<Post>,
  ) {}

  async createPost(createPostInput: CreatePostInput) {
    let post = this.Postrepository.create(createPostInput);
    return await this.Postrepository.save(post);
  }

  async findAllPosts() {
    return await this.Postrepository.createQueryBuilder().getMany();
  }

  async findPostById(postid: number) {
    const record = await this.Postrepository.createQueryBuilder('post')
      .where('post.postid = :postid', { postid })
      .getOne();
    console.log(record);
    if (record) {
      return record;
    } else {
      throw new UnprocessableEntityException('Post not found!');
    }
  }

  async updatePostById(postid: number, updatePostInput: CreatePostInput) {
    const updateResult = await this.Postrepository.createQueryBuilder('post')
      .update(Post)
      .set(updatePostInput)
      .where('post.postid = :postid', { postid })
      .execute();
    if (updateResult.affected) {
      return 'Record Updated Successfully';
    } else {
      return 'Record Not Found';
    }
  }

  async deletePostById(postid: number) {
    const delrecord = await this.Postrepository.createQueryBuilder()
      .where({ postid })
      .getOne();
    if (delrecord) {
      delrecord.deletedAt = new Date();
      this.Postrepository.save(delrecord);
      console.log(delrecord);
      return 'Data deleted Successfully';
    } else {
      return 'User not Found';
    }
  }
}
