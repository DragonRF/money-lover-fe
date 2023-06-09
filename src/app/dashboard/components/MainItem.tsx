import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import HelpIcon from '@mui/icons-material/Help';
import PixIcon from '@mui/icons-material/Pix';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import * as React from "react";
import WalletIcon from '@mui/icons-material/Wallet';
import Link from "next/link";

export const MainItem = () => {
    return (
        <React.Fragment>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Transaction" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Store" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <PixIcon />
                </ListItemIcon>
                <ListItemText primary="Budget" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
            </ListItemButton>
            <Link href='/wallets'>
            <ListItemButton>
                <ListItemIcon>
                    <WalletIcon />
                </ListItemIcon>
                <ListItemText primary="Wallet" />
            </ListItemButton>
            </Link>
            <ListItemButton>
                <ListItemIcon>
                    <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Help" />
            </ListItemButton>
        </React.Fragment>
    )
}