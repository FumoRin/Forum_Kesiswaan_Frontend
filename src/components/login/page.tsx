import { LoginForm } from "@/components/login/login-form";
import authImage from "../../assets/auth-img.jpg";
import appLogo from "../../assets/logo.svg";

export default function AuthPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-full">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex items-center gap-4 font-semibold text-lg text-red-700 hover:text-red-400"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-transparent text-primary">
              <img src={appLogo} alt="App Logo" />
            </div>
            Forum Kesiswaan Cimahi.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={authImage}
          alt="Login background"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
