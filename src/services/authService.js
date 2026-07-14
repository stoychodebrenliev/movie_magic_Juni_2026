import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

export async function register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const result = await userRepository.create({
        ...userData,
        password: hashedPassword
    });
    return result;
}

export async function login(userData) {
    const user = await userRepository.findByEmail(userData.email);

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
     const payload = { id: user.id, email: user.email };
     
     const token = jwt.sign(payload, 'SECRETGOESHERE', { expiresIn: '1h' });

    return token;
};
  
const authService = {
    register,
    login
};

export default authService;