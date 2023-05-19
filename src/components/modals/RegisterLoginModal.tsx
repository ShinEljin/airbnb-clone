"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useRegisterLoginModal from "@/hooks/useRegisterLoginModal";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const { onClose, isOpen, setEmail, email, setUserState, userState } =
    useRegisterLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (userState === "") {
      setEmail(data.email);
      try {
        const response = await axios.get(`/api/check-email/${data.email}`);

        if (!response.data) {
          //no email found need to register
          setUserState("register");
        } else {
          //login
          setUserState("login");
        }

        setIsLoading(false);
        // toast.success("Successfully registered!", {
        //   duration: 5000,
        // });
      } catch (error: any) {
        console.log(error.response);
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    } else if (userState === "register") {
      try {
        await axios.post("/api/register", data);
        onClose();
        setIsLoading(false);
        toast.success("Successfully registered!", {
          duration: 5000,
        });
      } catch (error: any) {
        console.log(error.response);
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    } else if (userState === "login") {
      try {
        const callback = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (callback?.error) {
          toast.error(callback.error);
        } else {
          toast.success("Successfully login!", {
            duration: 5000,
          });
          router.refresh();
          onClose();
        }

        setIsLoading(false);
      } catch (error: any) {
        console.log(error.response);
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    }
  };

  const bodyContent = (
    <div>
      {userState === "" && (
        <>
          <Heading title="Welcome to Airbnb" />
          <Input
            id="email"
            type="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </>
      )}
      {userState === "register" && (
        <div className="flex flex-col gap-4">
          <Input
            id="name"
            type="text"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@.!%&*?])[A-Za-z\d#$@!%.&*?]{8,30}$"
            title="Must contain at least one number, special character, uppercase and lowercase letter, and at least 8 or more characters"
          />
        </div>
      )}
      {userState === "login" && (
        <Input
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      )}
    </div>
  );

  const footerContent = (
    <div>
      {userState === "" && (
        <div className="flex flex-col gap-4 mt-3  ">
          <div className="flex items-center gap-2 ">
            <hr className="bg-neutral-700 w-full" />
            <p className="text-sm">or</p>
            <hr className="bg-neutral-700 w-full" />
          </div>

          <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn("google")}
            type="button"
          />

          <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn("github")}
            type="button"
          />
        </div>
      )}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title={
        userState === ""
          ? "Login or sign up"
          : userState === "register"
          ? "Finish signing up"
          : "Log in"
      }
      actionLabel={
        userState === ""
          ? "Continue"
          : userState === "register"
          ? "Agree and continue"
          : "Log in"
      }
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      userState={userState}
      setUserState={setUserState}
    />
  );
};
export default RegisterModal;
