import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'post' })
export class Post {
  @Field()
  @PrimaryGeneratedColumn({ name: 'postid' })
  postid: number;

  @Field()
  @Column({ name: 'name' })
  name: string;

  @Field()
  @Column({ name: 'createdAt' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ name: 'userid' })
  userid: number;

  @Field()
  @Column({ name: 'updatedAt' })
  @UpdateDateColumn({
    type: 'timestamp',
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({
    name: 'deletedAt',
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'userid' })
  User: User;
}
