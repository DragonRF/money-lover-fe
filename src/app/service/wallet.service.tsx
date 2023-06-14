import axios from "axios";
export class WalletService {
    static async createWallet(data){
        let token = localStorage.getItem('token')
        return await axios.post(
            'http://localhost:3000/wallets',
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }

}