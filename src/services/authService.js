import { log } from "node:console";

export function register(userData) {
    log('Register user:', userData)
}

const authService = {
    register,
};

export default authService;