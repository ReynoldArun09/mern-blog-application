import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/utils/ValidationSchema";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ValueType, authAtom } from "@/atoms/authAtom";

export default function LoginPage() {
  const [viewEye, setViewEye] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const setAuthState = useSetRecoilState<ValueType>(authAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (
    values: LoginSchemaType
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login-user",
        values
      );
      if (response.status === 200 && response.data.success === true) {
        sessionStorage.setItem('token', JSON.stringify(response.data.data))
        setAuthState({
          isLogged: {
            username: response.data.data.username,
            token: response.data.data.token,
            userId: response.data.data.userId,
          },
        });
        toast({
          variant: "default",
          title: "Welcome!!",
          description: "You have been successfully logged in",
        });
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title: "There was a problem with your request.",
          description: error.response?.data?.error,
        });
      } else {
        toast({
          variant: "destructive",
          title: "There was a problem with your request.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex justify-center items-center h-[80vh]">
      <form
        className="flex flex-col justify-center items-center space-y-4 w-[80%] sm:w-[35%] lg:w-[25%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-bold text-left">Login into your account</h1>
        <Input placeholder="Enter your email..." {...register("email")} />
        {errors.email && (
          <p className="text-rose-600">{errors.email.message}</p>
        )}
        <div className="w-full flex relative">
          <Input
            placeholder="Enter your password..."
            type={viewEye ? "text" : "password"}
            {...register("password")}
          />
          {viewEye ? (
            <AiOutlineEye
              className="absolute right-3 mt-1 cursor-pointer"
              size={30}
              onClick={() => setViewEye(!viewEye)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-3 mt-1 cursor-pointer"
              size={30}
              onClick={() => setViewEye(!viewEye)}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-rose-600">{errors.password.message}</p>
        )}
        <Button
          className="w-full px-4 py-4 text-lg font-bold rounded-lg"
          type="submit"
        >
          {loading ? "Submitting" : "Login"}
        </Button>
        <div className="flex justify-center items-center space-x-3">
          <p>Don't have an account?</p>
          <p
            className="text-gray-600 font-bold underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </p>
        </div>
      </form>
    </section>
  );
}
