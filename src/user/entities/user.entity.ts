import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field()
  @PrimaryGeneratedColumn({ name: 'userid' })
  userid: number;

  @Field()
  @Column({ name: 'name' })
  name: string;

  @Field()
  @Column({ name: 'mobileno' })
  mobileno: string;

  @Field()
  @Column({ name: 'email' })
  email: string;

  @Field()
  @Column({ name: 'password' })
  password: string;

  @Field()
  @Column({ name: 'createdAt' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ name: 'updatedAt' })
  @UpdateDateColumn({
    type: 'timestamp',
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.User)
  post: Post[];
}
