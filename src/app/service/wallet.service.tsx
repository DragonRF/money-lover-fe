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

    static async getWalletsByUserId(){
        let token = localStorage.getItem('token')
        return await axios.get(
            'http://localhost:3000/wallets/',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        )
    }

    static async deleteWalletById(walletId){
        let token = localStorage.getItem('token')
        return await axios.delete(
            `http://localhost:3000/wallets/${walletId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        )
    }
}