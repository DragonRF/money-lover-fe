'use client'
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {AppBar, Button, CardHeader, Collapse} from "@mui/material";
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


const PageWallet = () => {
    return (
        <Box sx={{flexGrow: 1, backgroundColor: '#d2d0d0', minHeight: 800}} >
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        My Wallet
                    </Typography>
                    <Button variant="contained" color="success">
                        Add Wallet
                    </Button>
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
                                    sx={{ width: '100%' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader" style={{backgroundColor:"#e8e8e8"}}>
                                            Included in Total
                                        </ListSubheader>
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <SendIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Saving" />
                                        100000
                                    </ListItemButton>
                                </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        </Box>
    )
}
export default PageWallet