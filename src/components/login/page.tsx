import { LoginForm } from "@/components/login/login-form";
import { SignupForm } from "@/components/login/signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
import authImage from "../../assets/auth-img.jpg";
import appLogo from "../../assets/logo.svg";

export default function AuthPage() {
  const location = useLocation();
  const defaultTab = location.state?.tab || "login";
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
            <Tabs
              defaultValue={defaultTab}
              className="flex flex-col min-h-[400px] relative"
            >
              {/* Add wrapper div with fixed height */}
              <div className="h-[60px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
              </div>

              {/* Add padding-top to content area */}
              <div className="flex-1 overflow-auto pt-2">
                <TabsContent value="login" className="mt-0">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="register" className="mt-0">
                  <SignupForm />
                </TabsContent>
              </div>
            </Tabs>
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
