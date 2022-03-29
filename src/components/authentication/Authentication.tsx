import "./Authentication.css";

interface Props {
  children: React.ReactNode;
}

interface AuthenticationErrorProps {
  message: string;
}

export function Authentication({ children }: Props) {
  return <div className="authentication-bg">{children}</div>;
}

export function AuthenticationError({ message }: AuthenticationErrorProps) {
  return <p className="authentication-form-error-text">{message}</p>;
}
