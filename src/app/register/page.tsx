"use client"
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import Link from "@mui/material/Link";
import Image from "next/image";

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '65vh',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 700,
    minHeight: 400,
    padding: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const FormContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center', // Center align the form
}));

const SocialLoginContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}));

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Perform login logic here
        console.log('Logging in...');
    };

    const handleSocialLogin = (platform) => {
        // Handle the login logic for the specified social media platform
        console.log(`Logging in with ${platform}`);
    };

    return (
        <div>
            <Box display="flex" justifyContent="center" marginTop={5}>
                <Image
                    src="/moneylover-logo.png" // Replace with the actual image source
                    alt="MoneyLoverLogo"
                    width={110}
                    height={150}
                />
            </Box>
            <Typography variant="h4" align="center" marginTop={5} gutterBottom>
                MoneyLover
            </Typography>
            <Container>
            <StyledCard>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                <FormContainer container spacing={2}>
                    <Grid item xs={6}>
                        <SocialLoginContainer>
                            <Typography variant="h6" align="center" gutterBottom>
                                Using social networking accounts
                            </Typography>
                            <Button
                                style={{ marginTop: 10, backgroundColor: "#0f4cbd" }}
                                variant="contained"
                                color="primary"
                                startIcon={<FacebookIcon />}
                                fullWidth
                                onClick={() => handleSocialLogin('Facebook')}
                            >
                                Facebook
                            </Button>
                            <Button
                                style={{ marginTop: 10, backgroundColor: "#1ed3e5" }}
                                variant="contained"
                                color="primary"
                                startIcon={<TwitterIcon />}
                                fullWidth
                                onClick={() => handleSocialLogin('Twitter')}
                            >
                                Twitter
                            </Button>
                            <Button
                                style={{ marginTop: 10, backgroundColor: "#e32918" }}
                                variant="contained"
                                color="primary"
                                startIcon={<GoogleIcon />}
                                fullWidth
                                onClick={() => handleSocialLogin('Google')}
                            >
                                Google
                            </Button>
                        </SocialLoginContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <form onSubmit={handleLogin}>
                            <Typography variant="h6" align="center" gutterBottom>
                                Using Money Lover account
                            </Typography>
                            <TextField
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                            <StyledButton type="submit" variant="contained" fullWidth style={{ backgroundColor: "#00bc2a" }}>
                                Sign Up
                            </StyledButton>
                            <Typography variant="body2" align="center">
                                Already have an account? <Link component="button" variant="body2" onClick={() => console.log("Login clicked")}>Login</Link>
                            </Typography>
                        </form>
                    </Grid>
                </FormContainer>
            </StyledCard>
        </Container>
        </div>
    );
};

export default LoginForm;
