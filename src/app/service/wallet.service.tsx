// walletService.tsx
import axios from "@/app/lib/axios";

export class WalletService {
    static async createWallet(data) {
        return await axios.post(
            'http://localhost:3000/wallets',
            data,
        )
    }

    static async getWalletsByUserId() {
        return await axios.get(
            'http://localhost:3000/wallets/',
        )
    }

    static async deleteWalletById(walletId) {
        return await axios.delete(
            `http://localhost:3000/wallets/${walletId}`,
        )
    }

    static async updateWalletById(walletId, data) {
        return await axios.put(
            `http://localhost:3000/wallets/${walletId}`,
            data,
        );
    }
}