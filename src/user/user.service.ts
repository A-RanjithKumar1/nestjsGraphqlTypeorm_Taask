import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly Userrepository: Repository<User>,
  ) {}
  async createUser(createUserInput: CreateUserInput) {
    console.log('This action adds a new user');
    let user = this.Userrepository.create(createUserInput);
    return await this.Userrepository.save(user);
  }

  async findAllUsers() {
    console.log('findall called');
    return await this.Userrepository.createQueryBuilder().getMany();
  }

  async findUserById(userid: number) {
    const record = await this.Userrepository.createQueryBuilder('users')
      .where('users.userid = :userid', { userid })
      .getOne();
    console.log('find on called');
    console.log(record);
    if (record) {
      return record;
    } else {
      throw new UnprocessableEntityException('User not found!');
    }
  }

  async updateUserById(userid: number, updateUserInput: CreateUserInput) {
    console.log('update called');
    const updateResult = await this.Userrepository.createQueryBuilder('users')
      .update(User)
      .set(updateUserInput)
      .where('users.userid = :userid', { userid })
      .execute();
    if (updateResult.affected) {
      return 'Record Updated Successfully';
    } else {
      return 'Record Not Found';
    }
  }

  async deleteUserById(userid: number) {
    const delrecord = await this.Userrepository.createQueryBuilder()
      .where({ userid })
      .getOne();
    if (delrecord) {
      delrecord.deletedAt = new Date();
      this.Userrepository.save(delrecord);
      console.log(delrecord);
      return 'Data deleted Successfully';
    } else {
      return 'User not Found';
    }
  }

  public async getusersPost(id: number) {
    return await this.Userrepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.post', 'post')
      .where('user.userid = :id', { id })
      .getOne();
  }
}
