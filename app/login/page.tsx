import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 ">
      <div className="  hidden lg:block w-full ">
        <div className="flex items-center justify-center w-full h-full">
          <div className="bg-[url('/login-background.svg')] bg-no-repeat bg-center bg-cover w-11/12 h-11/12  bottom-0 m-auto rounded-2xl  flex flex-col items-center justify-end ">
            <div className=" mb-10 flex flex-col items-center w-80 text-center ">
              <img src="/login-logo.svg" alt="..." />
              <h1 className="text-white text-4xl">Get Started with Us</h1>
              <p className="text-[#FFFFFFCC] text-xl">
                Effortless bookkeeping through smart automation.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
