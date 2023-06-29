// walletDetail.tsx
import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { WalletService } from "@/app/service/wallet.service";
import Swal from "sweetalert2";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {margin} from "@mui/system";

const WalletDialog = ({ selectedWallet, onClose, open }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [updatedWallet, setUpdatedWallet] = useState({
        name: '',
        currency: '',
        initialBalance: 0
    });

    const deleteWallet = (walletId) => {
        WalletService.deleteWalletById(walletId).then(async res => {
            if (res.data.status === "success") {
                onClose();
                open();
                await Swal.fire({
                    icon: 'success',
                    title: 'Wallet Deleted',
                    text: res.data.message,
                });
            }
        });
    };

    const openEditDialog = () => {
        setUpdatedWallet(selectedWallet);
        setEditOpen(true);
    };

    const closeEditDialog = () => {
        setEditOpen(false);
    };

    const handleEdit = (walletId) => {
        WalletService.updateWalletById(walletId, updatedWallet)
            .then(async res => {
                if (res.data.status === "success") {
                    const updatedWalletData = res.data.data;
                    setUpdatedWallet(updatedWalletData);
                    onClose();
                    open();
                    await Swal.fire({
                        icon: 'success',
                        title: 'Wallet Updated',
                        text: res.data.message,
                    });
                }
            })
            .catch(async error => {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                });
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedWallet(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Dialog
            open={selectedWallet !== null}
            onClose={onClose}
            maxWidth="md"
        >
            <DialogTitle>Wallet Information</DialogTitle>
            <DialogContent sx={{ minWidth: 500 }}>
                {selectedWallet && (
                    <div>
                        <Typography variant="h6">Name: {selectedWallet.name}</Typography>
                        <Typography>
                            {`Initial Balance: `}{new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: "VND"
                        }).format(selectedWallet.initialBalance)}
                        </Typography>
                        <Typography>{`Currency: ${selectedWallet.currency}`}</Typography>

                        {/* Add more wallet information here */}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteWallet(selectedWallet.id)}
                >
                    Delete
                </Button>
                <Button startIcon={<EditIcon />} onClick={openEditDialog}>
                    Edit
                </Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
            {/* Render the edit dialog when editOpen is true */}
            <Dialog open={editOpen} onClose={closeEditDialog}>
                <DialogTitle>Edit Wallet</DialogTitle>
                <DialogContent sx={{ minWidth: 400, minHeight: 200 }}>

                        <Box style={{margin: 10}}>
                            <TextField
                                name="name"
                                type="text"
                                label="Wallet name"
                                variant='outlined'
                                color="primary"
                                focused
                                fullWidth
                                value={updatedWallet.name}
                                onChange={handleInputChange}
                            />
                        </Box>


                    <Box style={{margin: 10, paddingTop:10}}>
                        <TextField
                            name="currency"
                            type="text"
                            label="Currency"
                            variant='outlined'
                            color="primary"
                            value={updatedWallet.currency}
                            onChange={handleInputChange}
                            focused
                            fullWidth
                        />
                    </Box>
                    <Box style={{margin: 10, paddingTop:10}}>
                        <TextField
                            name="initialBalance"
                            type="number"
                            label="Initial Balance"
                            variant='outlined'
                            color="primary"
                            focused
                            fullWidth
                            value={updatedWallet.initialBalance}
                            onChange={handleInputChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleEdit(selectedWallet.id)} color="primary">
                        Save
                    </Button>
                    <Button color="error" onClick={closeEditDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
};

export default WalletDialog;
