export type LoginPayload = {
    username: string,
    password: string
}

export type User = {
  _id: string;
  email: string;
  username: string;
  role: "ADMIN" | "USER";
  isEmailVerified: boolean;
  avatar: {
    _id: string;
    url: string;
    localPath: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: User
  },
  message: string,
  statusCode: number,
  success: boolean
}

export type RegisterPayload = {
  email: string;
  password: string;
  username: string;
};

export type RegisterResponse = {
  user: User;
}