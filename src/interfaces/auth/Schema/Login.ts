import { z } from "zod"

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Tên tài khoản không được để trống")
    .min(3, "Tên tài khoản phải có ít nhất 3 ký tự")
    .max(50, "Tên tài khoản không được quá 50 ký tự"),
  password: z
    .string()
    .min(1, "Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  rememberAccount: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

export interface LoginSchema {
  username: string
  password: string
}
