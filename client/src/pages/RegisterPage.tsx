import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "@/utils/ValidationSchema";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const [viewEye, setViewEye] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (
    values: RegisterSchemaType
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register-user",
        values
      );
      if (response.status === 201 && response.data.success === true) {
        toast({
          variant: "default",
          title: "Welcome!!",
          description: "You have been registered successfully",
        });
        navigate("/login");
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
    <section className="w-full flex justify-center items-center h-[80vh] ">
      <form
        className="flex flex-col justify-center items-center space-y-4 w-[80%] sm:w-[35%] lg:w-[25%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-bold text-left">Create your account</h1>
        <Input placeholder="Enter your username..." {...register("username")} />
        {errors.username && (
          <p className="text-rose-600">{errors.username.message}</p>
        )}
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
        <Button className="w-full px-4 py-4 text-lg font-bold rounded-lg">
          {loading ? "Submitting" : "Register"}
        </Button>
        <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p>
          <p
            className="text-gray-600 font-bold underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </p>
        </div>
      </form>
    </section>
  );
}
