import axios from "axios";
export class AuthService {
    static async register(data){
        return await axios.post(
            "http://localhost:3000/register",
            data
        )
    }
    static async login(data){
        return await axios.post(
            "http://localhost:3000/auth/login",
            data
        )
    }
    static async loginGoogle(data){
        return await axios.post(
            "http://localhost:3000/auth/google/login",
            data
        )
    }
}