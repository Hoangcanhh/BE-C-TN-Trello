import { User } from '../../modules/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

export class UserFactory {
  static async create(data: Partial<User> = {}): Promise<User> {
    const user = new User();
    const status =['pending', 'active', 'inactive', 'banned'];
    user.username = data.username || faker.person.fullName();
    user.password = await bcrypt.hash(data.password || faker.internet.password(), 10);
    user.email = data.email || faker.internet.email();
    user.phone_number = data.phone_number || faker.phone.number();
    user.address = data.address || faker.location.country();
    user.created_at = data.created_at || faker.date.past();
    user.updated_at = data.updated_at || faker.date.recent();
    return user;
  }
}