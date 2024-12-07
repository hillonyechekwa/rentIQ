import {z} from "zod";


export type FormState =
    | {
    error?: {
        username?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string;
}
| undefined;

export const SignupFormSchema = z.object({
    username: z.string().min(2, {
        message: "Name must be at least 3 characters long"
    }).trim(),
    email: z.string().email({message: "Please enter a valid email"}).trim(),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}).regex(/[a-zA-Z]/, {
        message: "Contain at least one letter"
    }).regex(/[0-9]/, {
        message: "Contain at least one letter"
    }).regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least special character"
    }).trim()
})


export const LoginFormSchema = z.object({
    email: z.string().email({message: "Please enter a valid email"}),
    password: z.string().min(1, {
        message: "Password field must not be empty"
    })
})