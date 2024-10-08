'use client'
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

const VerifyAccount = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: param.username,
        code: data.code,
      });
      toast({
        title: "success",
        description: response.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      console.log("Error in Sign-Up of User ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Sign-Up Error",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    }
  };
  const resend = async () => {
    try {
      const response = await axios.post('/api/resend-verify-code',{
        username: param.username
      });
      toast({
        title: "success",
        description: response.data.message,
      });
    } catch (error) {
      console.log("Error in Sign-Up of User ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Sign-Up Error",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                name="code"
              control={form.control}
             
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="code" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <p>
            did'nt get the code?{" "}
            <Button type="button"  className="bg-blue-500" onClick={resend}>Resend</Button>
          </p>
      </div>
    </div>
  );
};

export default VerifyAccount;
