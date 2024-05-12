import { z } from 'zod';

// CREATE USER SCHEMA
const createUserSchema = z.object({
    name: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(6, 'Password is required'),
    passwordConfirm: z.string().min(6, 'Password confirm is required'),
})

// UPDATE USER SCHEMA
const updateUserSchema = z.object({
    name: z.string().min(1, 'Username is required'),
    role: z.string().min(1, { message: "Role is required" }),
    avatar: z.string().min(1, { message: "Avatar is required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
})

export const validateCreateUser = (req, res, next) => {
    try {
        // Kiểm tra dữ liệu đầu vào
        createUserSchema.parse(req.body);
        // Nếu dữ liệu hợp lệ, tiếp tục xử lý
        next();
    } catch (error) {
        // Nếu dữ liệu không hợp lệ, trả về lỗi
        res.status(400).json({ error: error.errors });
    }    
}