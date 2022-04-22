export interface LoginDTO {
  username: string;
  password: string;
}

export interface ResetPasswordDTO {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  countryCode: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  roles: string[];
  token: string;
}

export interface CredentialsData {
  clientSecret: string;
  clientId: string;
}

export interface ConfigurationData {
  userId: string;
  countryCode: string;
  smsUnitPrice: number;
  smsIntlUnitPrice: number;
  whatsappUnitPrice: number;
  otpUnitPrice: number;
  otpIntlUnitPrice: number;
  otpLength: number;
  otpIsAlphaNumeric: boolean;
  otpMessageTemplate: string;
}

export interface EditConfigurationDTO {
  otpLength: number;
  otpIsAlphaNumeric: boolean;
  otpMessageTemplate: string;
  userId: string;
}
