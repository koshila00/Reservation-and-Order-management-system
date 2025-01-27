export class CreateUserDTO {
  userName?: string;
  userAddress?: string | null;
  userPhoneNumber?: string;
  userEmail?: string;
  userPassword?: string;
  userRole?: string;
}

export class UpdateUserDTO {
  userName?: string;
  userAddress?: string | null;
  userPhoneNumber?: string;
  userEmail?: string;
  userPassword?: string;
  userRole?: string;
}

export class UserDTO {
  userId?: number;
  userName?: string;
  userAddress?: string | null;
  userPhoneNumber?: string;
  userEmail?: string;
  userRole?: string;
}
