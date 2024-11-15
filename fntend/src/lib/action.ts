"use server";

import { z } from "zod";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
const { UserModel }=require("./db");
import mongoose from "mongoose";
// require('dotenv').config();
mongoose.connect("mongodb+srv://kaizopearl:vishwas1660@cluster0.y78vn.mongodb.net/Start")

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});
const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  const user=await UserModel.findOne({
    email:email,
    password:password
  })
  if(!user){
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(user.username);

  redirect("/feedback");
}


export async function signUp(prevState: any, formData: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(formData));
console.log("hlo");
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { username, email, password } = result.data;
  const user1=await UserModel.findOne({
    email:email
  })
  if(user1){
    return {
      errors: {
        email: ["Email Already Exists"],
      },
    };
  }
  const user2=await UserModel.findOne({
    username:username
  })
  if(user2){
    return {
      errors: {
        username: ["Username Already Exists"],
      },
    };
  }
  await UserModel.create({
    username:username,
    email : email, 
    password :password,
  })
  redirect("/signin");
}
export async function googleSuccess() {
  redirect("/feedback");
}
export async function logout() {
  await deleteSession();
  redirect("/signin");
}