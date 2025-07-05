import { RegisterForm } from "@/components/auth/RegisterForm";
import { CardWrapper } from "@/components/auth/card-wrapper";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <CardWrapper
        headerLabel="Create a PanchayatPro account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
      >
        <RegisterForm />
      </CardWrapper>
    </div>
  );
};

export default RegisterPage;