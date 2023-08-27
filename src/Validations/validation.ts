import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/constants/constants";

export const signup = z
  .object({
    fullName: z.string().min(8).max(16).nonempty(),
    email: z
      .string()
      .email({ message: "Please enter a valid email" })
      .nonempty(),
    password: z.string().min(8).max(16),
    confirmPassword: z.string().min(8).max(16),
    isSeller: z.boolean(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password doesnt match",
    path: ["confirmPassword"],
  });
export type signupParams = z.infer<typeof signup>;

export const signin = z.object({
  email: z.string().min(4).max(30).nonempty(),
  password: z.string().min(8).max(16),
});

export type signinParams = z.infer<typeof signin>;

export const itemData = z.object({
  itemName: z.string().min(4).max(20),
  description: z.string().nonempty(),
  price: z.number(),
  category: z.string(),

  img1: z.any().refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),

    "Only .jpg, .jpeg, .png and .webp formats are supported."
  ),
  img2: z
    .any()
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  img3: z
    .any()
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  img4: z
    .any()
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  // img1: z.any(),
  // img2: z.any(),
  // img4: z.any(),
  // img3: z.any(),

  stock: z.number().nonnegative(),
});
export type itemDataparams = z.infer<typeof itemData>;

export const itemDataBackend = z.object({
  itemName: z.string().min(4).max(20),
  description: z.string().nonempty(),
  price: z.number(),
  category: z.string(),
  img1: z.string(),
  img2: z.string(),
  img4: z.string(),
  img3: z.string(),
  stock: z.number().nonnegative(),
  sellerInfo: z.string(),
});
