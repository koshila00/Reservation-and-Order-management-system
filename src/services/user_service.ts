import { Repository, DeepPartial } from "typeorm";
import { User } from "../entities/User";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../dtos/User_Dto";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

export class UserService {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const newUser = new User();
    newUser.userName = createUserDto.userName ?? "";
    newUser.userAddress = createUserDto.userAddress ?? ""; // Use empty string if userAddress is undefined
    newUser.userPhoneNumber = createUserDto.userPhoneNumber ?? ""; // Use empty string if userPhoneNumber is undefined
    newUser.userEmail = createUserDto.userEmail ?? ""; // Use empty string if userEmail is undefined
    newUser.userPassword = createUserDto.userPassword ?? ""; // Use empty string if userPassword is undefined
    newUser.userRole = createUserDto.userRole ?? ""; // Use empty string if userRole is undefined

    return await this.userRepository.save(newUser);
  }

  async updateUser(
    userEmail: string,
    updateUserDto: UpdateUserDTO
  ): Promise<User> {
    try {
      const user = await this.findUserByEmail(userEmail);

      if (!user) {
        throw new NotFoundError(`User with email ${userEmail} not found`);
      }

      Object.assign(user, updateUserDto);

      return await this.userRepository.save(user);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.findUserById(userId);
    // if (!user) {
    //   throw new NotFoundError(`User with id ${userId} not found`);
    // }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { userEmail: email },
    });
    return user || null;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const user = await this.findUserById(userId);
    await this.userRepository.remove(user);
    return true;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      userId: user.userId,
      userName: user.userName,
      userAddress: user.userAddress,
      userPhoneNumber: user.userPhoneNumber,
      userEmail: user.userEmail,
      userRole: user.userRole,
    }));
  }
}
