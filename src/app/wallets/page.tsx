'use client'
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    AppBar,
    Button,
    CardHeader, Checkbox,
    Collapse,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, FormControlLabel, InputLabel, NativeSelect, TextField
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {WalletService} from "@/app/service/wallet.service";
import Link from "next/link";
import Swal from 'sweetalert2';
import WalletDialog from "@/app/dashboard/components/wallets/walletDetail";


const WalletSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    currency: Yup
        .mixed()
        .oneOf(['usd', 'vnd', 'eur'] as const)
        .defined(),
    initialBalance: Yup.number().default(0)
})


const PageWallet = () => {
    const [open, setOpen] = useState(false);
    const [wallets, setWallets] = useState([])
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        WalletService.getWalletsByUserId().then(res => {
            console.log(res.data.data)
            setWallets(res.data.data)
        })
    }, [open,reload])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            currency: 'vnd',
            initialBalance: 0
        },
        validationSchema: WalletSchema,
        onSubmit: async (values) => {
            try {
                const res = await WalletService.createWallet(values);
                if (res.data.status === 'success') {
                    handleClose();
                    await Swal.fire({
                        icon: 'success',
                        title: 'Wallet Created',
                        text: 'Wallet created successfully!',
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
    return (
        <Box sx={{flexGrow: 1, backgroundColor: '#d2d0d0', minHeight: 800}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Link href="/dashboard" color="white">
                            <ArrowBackIcon/>
                        </Link>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        My Wallet
                    </Typography>
                    <div>
                        <Button variant="contained" color="success" onClick={handleClickOpen}>
                            Add Wallet +
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Add new wallet!</DialogTitle>
                            <DialogContent style={{width: 550, padding: 10}}>
                                <Box sx={{justifyContent: 'space-evenly', width: 400, margin: 5}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="name"
                                                type='text'
                                                label="Wallet name"
                                                variant="filled"
                                                color="primary"
                                                placeholder="Your wallet name?"
                                                focused
                                                fullWidth
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>

                                    </Grid>
                                </Box>
                                <Box sx={{justifyContent: 'space-evenly', width: 400, margin: 5}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                    Currency
                                                </InputLabel>
                                                <NativeSelect
                                                    value={formik.values.currency}
                                                    name='currency'
                                                    onChange={formik.handleChange}
                                                >
                                                    <option value="vnd">VND</option>
                                                </NativeSelect>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Initial Balance"
                                                name="initialBalance"
                                                variant="filled"
                                                onChange={formik.handleChange}
                                                value={formik.values.initialBalance}
                                                color="primary"
                                                type="number"
                                                focused
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </DialogContent>
                            <FormControlLabel style={{marginLeft: 20}} control={<Checkbox/>}
                                              label="Excluded from Total"/>
                            <p style={{margin: 20, fontSize: 13}}>Ignore this wallet & its balance in the "Total"
                                mode.</p>
                            <form onSubmit={formik.handleSubmit}>
                                <DialogActions>
                                    <Button variant="contained" onClick={handleClose} color="error">Cancel</Button>
                                    <Button variant="contained" type="submit" color="success">Add</Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    </div>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{
                mt: 4,
                mb: 4,
                justifyContent: 'center',

            }}>
                <Grid container spacing={3} justifyContent="center">
                    {/* Chart */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper
                            sx={{
                                p: 2,
                                flexDirection: 'column',
                                justifyContent: "center"
                            }}
                        >
                            <List
                                sx={{width: '100%'}}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader"
                                                   style={{backgroundColor: "#e8e8e8"}}>
                                        Included in Total
                                    </ListSubheader>
                                }
                            >
                                {wallets.length > 0 && wallets.map((item) => (
                                        <ListItemButton key={item.id} onClick={() => setSelectedWallet(item)}>
                                            <ListItemIcon>
                                                <SendIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary={item.name}/>
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: "VND"
                                            }).format(item.initialBalance)
                                            }
                                        </ListItemButton>

                                    )
                                )}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <WalletDialog selectedWallet={selectedWallet} open={() => setReload(!reload)}
                          onClose={() => setSelectedWallet(null)}/>
        </Box>
    )
}
export default PageWallet