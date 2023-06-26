import React from 'react';
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import {WalletService} from "@/app/service/wallet.service";
import Swal from "sweetalert2";

const WalletDialog = ({selectedWallet, onClose, open}) => {

    const deleteWallet = (walletId) => {
        WalletService.deleteWalletById(walletId).then(async res => {
            if (res.data.status === "success") {
                onClose()
                open()
                await Swal.fire({
                    icon: 'success',
                    title: 'Wallet Deleted',
                    text: res.data.message,
                });
            }
        })
    }

    return (
        <Dialog open={selectedWallet !== null}
                onClose={onClose}
                maxWidth="md"
        >
            <DialogTitle>Wallet Information</DialogTitle>
            <DialogContent sx={{minWidth: 500}}>
                {selectedWallet && (
                    <div>
                        <Typography variant="h6">Name: {selectedWallet.name}</Typography>
                        <Typography>{`Initial Balance: `}{new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: "VND"
                        }).format(selectedWallet.initialBalance)
                        }</Typography>

                        <Typography>{`Currency: ${selectedWallet.currency}`}</Typography>

                        {/* Add more wallet information here */}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon/>}
                        onClick={() => deleteWallet(selectedWallet.id)}
                >
                    Delete
                </Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WalletDialog;
