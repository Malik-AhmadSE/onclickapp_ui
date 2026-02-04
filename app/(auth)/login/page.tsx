import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/module/(auth)/login/login";
import { loginPageContent } from "@/module/(auth)/login/data/login.data";

export default function LoginPage() {
  const { hero } = loginPageContent;
  return (
    <div className="grid min-h-svh lg:grid-cols-2 ">
      <div className="  hidden lg:block w-full ">
        <div className="flex items-center justify-center w-full h-full">
          <div className="bg-[url('/login-background.svg')] bg-no-repeat bg-center bg-cover w-11/12 h-11/12  bottom-0 m-auto rounded-2xl  flex flex-col items-center justify-end ">
            <div className=" mb-10 flex flex-col items-center w-80 text-center ">
              <img src="/login-logo.svg" alt={hero.imageAlt} />
              <h1 className="text-white text-4xl">{hero.title}</h1>
              <p className="text-[#FFFFFFCC] text-xl">
                {hero.description}
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
