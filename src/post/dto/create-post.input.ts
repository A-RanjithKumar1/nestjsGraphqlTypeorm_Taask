import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreatePostInput {
  @Field()
  name: string;

  @Field()
  userid: number;
}
