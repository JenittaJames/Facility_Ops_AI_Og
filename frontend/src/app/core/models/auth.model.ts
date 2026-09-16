export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;

  data: {
    accessToken: string;
    refreshToken: string;

    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      userType: string;
    };
  };
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role?: string;
    userType: string;
}


export interface RegisterResponse{
    message : string
}


export interface OtpRequest {
    email : string;
    otp : string;
    purpose : string;
}

export interface OtpResponse {
    message : string
}

