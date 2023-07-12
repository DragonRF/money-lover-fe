import React, {useEffect, useState} from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {WalletService} from "@/app/service/wallet.service";
import {TransactionService} from "@/app/service/transaction.service";
import Divider from '@mui/material/Divider';
import Swal from "sweetalert2";

interface TransactionDialogProps {
    open: boolean;
    onClose: () => void;
}

const transactionSchema = Yup.object().shape({
    wallet: Yup.string().required('Wallet is required'),
    subtype: Yup.string().required('Subtype is required'),
    transaction: Yup.string().required('Transaction type is required'),
    amount: Yup.number().required('Amount is required'),
    note: Yup.string(),
});

const TransactionDialog: React.FC<TransactionDialogProps> = ({open, onClose}) => {
    const [wallets, setWallets] = useState([]);
    const [typeTransactions, setTypeTransactions] = useState([])
    const [selectedTransactionType, setSelectedTransactionType] = useState('');

    const handleAddTransaction = () => {
        // Perform your logic to add the transaction here
        // You can access the selected values from the state variables (wallet, transaction, amount, note, date)
        onClose();
    };

    useEffect(() => {
        WalletService.getWalletsByUserId().then(res => {
            setWallets(res.data.data)
        })
    }, [])

    useEffect(() => {
        TransactionService.getTypeTransactions().then(res => {
            setTypeTransactions(res.data.data)
            console.log(res.data.data)
        })

    }, [])


    const formAdd = useFormik<any>({
        initialValues: {
            wallet: "",
            note: "",
            amount: "",
            date: "",
            subtype: ""
        },
        // validationSchema: transactionSchema,
        onSubmit: async (values) => {
            try{
                const res = await TransactionService.createTransaction(values)
                if (res.data.status === 'success') {
                    onClose();
                    await Swal.fire({
                        icon: 'success',
                        title: 'Transaction Created',
                        text: 'Transaction created successfully!',
                    });
                }
            } catch (error){
                console.log(error)
            }
            console.log(values)
        }
    })


    return (
        <Dialog open={open} onClose={onClose} style={{minWidth: 700}}>
            <DialogTitle>Add Transaction</DialogTitle>
            <form onSubmit={formAdd.handleSubmit}>
                <DialogContent>
                    <Box style={{margin: 10}}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <FormControl fullWidth focused variant="outlined">
                                    <InputLabel id="wallet">Wallet</InputLabel>
                                    <Select
                                        onChange={formAdd.handleChange}
                                        name="wallet"
                                        label="Wallet"
                                        style={{margin: 10, paddingTop: 10}}
                                    >
                                        {wallets && wallets.map(item => (
                                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                            )
                                        )}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth focused variant="outlined">
                                    <InputLabel id="subtype">Type</InputLabel>
                                    <Select native defaultValue=""
                                            onChange={formAdd.handleChange}
                                            name="subtype"
                                            label="Sub-Type"
                                            style={{margin: 10, paddingTop: 10}}
                                    >


                                        {typeTransactions && typeTransactions.map(item => {
                                                return (
                                                    <optgroup label={item.name}>
                                                        {item.subtype.map(subtypeItem => (
                                                            <option key={item.id + subtypeItem.id}
                                                                    value={subtypeItem.id}>{subtypeItem.name}</option>
                                                        ))}

                                                    </optgroup>
                                                )
                                            }
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    onChange={formAdd.handleChange}
                                    name="amount"
                                    label="Amount"
                                    type="number"
                                    placeholder="e.g: 500000"
                                    fullWidth
                                    variant="outlined"
                                    value={formAdd.values.amount}
                                    focused
                                    style={{margin: 10, paddingTop: 10}}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    name="note"
                                    label="Note"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    value={formAdd.values.note}
                                    onChange={formAdd.handleChange} focused
                                    style={{margin: 10, paddingTop: 10}}
                                    placeholder="Add note here"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Date"
                                    name="date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={formAdd.values.date}
                                    onChange={formAdd.handleChange} focused
                                    style={{margin: 10, paddingTop: 10}}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="success"
                            style={{backgroundColor: 'green'}}>
                        Add
                    </Button>
                </DialogActions>
            </form>

        </Dialog>
    );
};

export default TransactionDialog;
