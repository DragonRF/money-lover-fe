// walletService.tsx
import axios from "@/app/lib/axios";

export class TransactionService {
    static async createTransaction(data) {
        return await axios.post(
            'http://localhost:3000/transactions',
            data,
        )
    }

    static async getTransactionById() {
        return await axios.get(
            'http://localhost:3000/transactions/',
        )
    }

    static async getSubtypeById() {
        return await axios.get(
            'http://localhost:3000/subtypes/',
        )
    }

    static async getTypeTransactions() {
        return await axios.get(
            'http://localhost:3000/type-transactions/',
        )
    }

}