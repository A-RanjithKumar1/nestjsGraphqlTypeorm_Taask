import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    console.log('createmutation called');
    return this.userService.createUser(createUserInput);
  }

  @Query(() => [User])
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Query(() => User)
  findUserById(@Args('userid') userid: number) {
    console.log('find one called');
    return this.userService.findUserById(userid);
  }

  @Mutation(() => String)
  updateUserById(
    @Args('userid') userid: number,
    @Args('updateUserInput') updateUserInput: CreateUserInput,
  ) {
    return this.userService.updateUserById(userid, updateUserInput);
  }
  @Mutation(() => String)
  deleteUserById(@Args('userid') userid: number) {
    return this.userService.deleteUserById(userid);
  }

  @Query(() => User)
  public async getusersPost(@Args('id') id: number) {
    return this.userService.getusersPost(id);
  }
}
