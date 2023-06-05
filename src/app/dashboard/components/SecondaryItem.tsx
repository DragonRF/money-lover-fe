import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

export const SecondaryItem = () =>{
    const router = useRouter()
    const logout = async () => {
        localStorage.removeItem('token');
        Cookies.remove('token')
        await router.push('/login')
    }

    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                Saved reports
            </ListSubheader>
            <ListItemButton>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" onClick={logout}/>
            </ListItemButton>
        </React.Fragment>
    )
}