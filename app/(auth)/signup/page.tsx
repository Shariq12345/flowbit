import { RegisterForm } from "@/features/auth/components/register-form";
import { requireUnAuth } from "@/lib/auth-utils";

const SignUp = async () => {
  await requireUnAuth();
  
  return <RegisterForm />;
};

export default SignUp;
