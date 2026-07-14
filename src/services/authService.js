import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";

export async function register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const result = await userRepository.create({
        ...userData,
        password: hashedPassword
    });
    return result;
}

const login = async ({ email, password }) => {
    console.log(email, password);
};

const authService = {
    register,
    login
};

export default authService;