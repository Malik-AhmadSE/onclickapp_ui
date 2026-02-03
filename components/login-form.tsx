'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "./ui/checkbox";
import {  loginSchema, type LoginAuth } from "./schemas/schema";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/chatbot";
  
  const [error , setError] = useState<{email?: string; password?: string}>({});
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  const updatedData = { ...loginData, [name]: value };
  setloginData(updatedData);
 
  const results = loginSchema.safeParse(updatedData);
  setError((prev) => ({
    ...prev,
    [name]: results.success ? "" : results.error.issues.find(i => i.path[0] === name)?.message || "",
  }));
};
  



  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(loginData);

   if (!result.success) {
  const fieldErrors = result.error.flatten().fieldErrors;

  setError({
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
  });

  return;
}

    setError({});
    console.log("[LOGIN] Starting sign in, callbackUrl:", callbackUrl);
    const res = await signIn("credentials", {
      redirect: false,
      email: loginData.email,
      password: loginData.password,
      callbackUrl,
    });
    console.log("[LOGIN] signIn response:", res);

    if (res?.ok) {
      console.log("[LOGIN] Success, redirecting to:", callbackUrl);
      router.push(callbackUrl);
      router.refresh();
    } else {
      console.log("[LOGIN] Failed:", res?.error);
      setError((prev) => ({ ...prev, password: "Invalid email or password" }));
    }
  }
  return (
    <form onSubmit={handleSubmit} className={cn(" lg:w-132 sm:w-120 w-xs", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-3 text-center ">
          <h1 className="text-5xl ">Welcome</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email and password to access your account
          </p>
        </div>
        <Field>
         <div className="mb-3 flex flex-col gap-2">
           <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="bg-[#F3F3F3] border-none"
            onChange={handleChange}
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p> }
         </div>
       
        
         <div className=" flex flex-col gap-2">
           <FieldLabel htmlFor="password">Password</FieldLabel>

         <div className="relative">
           <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="bg-[#F3F3F3]  border-none"
            onChange={handleChange}
            
          />
          {error.password && <p className="text-red-500 text-sm">{error.password}</p> }
          <img className="w-5 h-5 absolute right-3 top-2 cursor-pointer  " src="/eye.svg" alt=".." />
         </div>
         </div>
         <div className="flex justify-between">
           <div className="flex items-center">
             <Checkbox />
            <p className="ml-2 inline-block text-sm text-[#3D3D3D]">Remember me</p>
           </div>
           <a className="text-sm text-[#3D3D3D] hover:underline" href="">Forget password?</a>
          </div>
         </Field>
         
          
         
        <Field>
          <Button type="submit" className="bg-[#AEE485] hover:bg-[#baee92] text-black">
            Sign In
          </Button>
        

      
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3">
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272v95.1h146.9c-6.3 33.9-25 62.6-53.4 81.8v67h86.4c50.5-46.5 81.6-115.1 81.6-193.6z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.6 0 133.6-24.1 178.1-65.3l-86.4-67c-24 16.1-54.6 25.5-91.7 25.5-70.5 0-130.3-47.6-151.6-111.4H32.4v69.9C76.9 475.6 168.4 544.3 272 544.3z"
              />
              <path
                fill="#FBBC05"
                d="M120.4 326.1c-10.4-31.4-10.4-65.5 0-96.9v-69.9H32.4c-36.4 72.7-36.4 159 0 231.7l88-64.9z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c39.5-.6 77.3 14 106.1 40.6l79.1-79.1C405.6 26.6 344.7 0 272 0 168.4 0 76.9 68.7 32.4 159.3l88 69.9C141.7 155.3 201.5 107.7 272 107.7z"
              />
            </svg>
            Sign in with Google
          </Button>
          </Field>
          <FieldDescription className="text-center mt-8">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        
      </FieldGroup>
    </form>
  );
}
