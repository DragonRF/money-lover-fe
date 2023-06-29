import React, { useState } from 'react';
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

interface TransactionDialogProps {
    open: boolean;
    onClose: () => void;
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({ open, onClose }) => {
    const [wallet, setWallet] = useState('');
    const [transaction, setTransaction] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [date, setDate] = useState('');

    const handleAddTransaction = () => {
        // Perform your logic to add the transaction here
        // You can access the selected values from the state variables (wallet, transaction, amount, note, date)
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} style={{ minWidth: 700 }}>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogContent>
                <Box style={{ margin: 10 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormControl fullWidth focused variant="outlined">
                                <InputLabel id="wallet">Wallet</InputLabel>
                                <Select
                                    name="wallet"
                                    label="Wallet"

                                    onChange={(e) => setWallet(e.target.value as string)}
                                    style={{ margin: 10, paddingTop: 10 }}
                                >
                                    <MenuItem value="note1">Wallet 1</MenuItem>
                                    <MenuItem value="note2">Wallet 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth focused variant="outlined">
                                <InputLabel id="transaction">Transaction</InputLabel>
                                <Select
                                    name="transaction"
                                    label="Transaction"

                                    onChange={(e) => setTransaction(e.target.value as string)}
                                    style={{ margin: 10, paddingTop: 10 }}
                                >
                                    <MenuItem value="note1">Transaction 1</MenuItem>
                                    <MenuItem value="note2">Transaction 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name="amount"
                                label="Amount"
                                type="number"
                                placeholder="e.g: 500000"
                                fullWidth
                                variant="outlined"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                focused
                                style={{ margin: 10, paddingTop: 10 }}
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
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                focused
                                style={{ margin: 10, paddingTop: 10 }}
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
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                focused
                                style={{ margin: 10, paddingTop: 10 }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddTransaction} variant="contained" color="success" style={{ backgroundColor: 'green' }}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TransactionDialog;
