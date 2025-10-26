import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";

const Login = async () => {
  await requireUnAuth();
  return <LoginForm />;
};

export default Login;
