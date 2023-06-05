//login.tsx
"use client"
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Alert, Card, Snackbar} from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";
import Image from "next/image";
import {useFormik} from "formik";
import * as Yup from 'yup';
import Cookies from 'js-cookie'
import {AuthService} from "@/app/service/auth.service";
import {SyntheticEvent, useState} from "react";

const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Password needs to be minimum 8 - 16 characters!')
        .max(16, 'Password needs to be minimum 8 - 16 characters!')
        .required('Required'),
});

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
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState("")

    const handleLogin = async (values) => {
        try {
            const response = await AuthService.login(values);
            if (response.data.status == 'success') {
                let token = response.data.data.access_token;
                localStorage.setItem('token', token);
                // dung cookie de luu token
                Cookies.set('token', token)
                setOpen(true);
                await router.push('/dashboard');
            } else {
                setErrMessage(response.data.message)
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleSocialLogin = (platform) => {
        console.log(`Logging in with ${platform}`);
    };

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: SigninSchema,
        onSubmit: handleLogin
    });


    return (
        <div>
            <Box display="flex" justifyContent="center" marginTop={5}>
                <Image
                    src="/moneylover-logo.png" // Replace with the actual image source
                    alt="MoneyLoverLogo"
                    width={80}
                    height={80}
                />
            </Box>
            <Typography variant="h4" align="center" marginTop={5} gutterBottom>
                Money Lover
            </Typography>
            <Container>
            <StyledCard>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
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
                        <form onSubmit={formik.handleSubmit}>
                            <Typography variant="h6" align="center" gutterBottom>
                                Using Money Lover account
                            </Typography>
                            { errMessage && <Alert severity="error">{errMessage}!</Alert>}
                            <TextField
                                name="email"
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                margin="normal"
                            />
                            {formik.errors.email && formik.touched.email ? <Typography color="error">{formik.errors.email}</Typography> : null}

                            <TextField
                                name="password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                required
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {formik.errors.password && formik.touched.password ? <Typography color="error">{formik.errors.password}</Typography> : null}

                            <Link component="button" href="/" variant="body2">
                                Forgot Password
                            </Link>
                            <StyledButton type="submit" variant="contained" fullWidth style={{ backgroundColor: "#00bc2a" ,marginTop:15,marginBottom:15}}>
                                Login
                            </StyledButton>
                        </form>
                        <Typography variant="body2" align="center">
                        Don’t have an account?
                            <Link href="/register" variant="body2" style={{color:"blue"}}> Register</Link>
                    </Typography>
                    </Grid>
                </FormContainer>
            </StyledCard>
        </Container>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Login Success!
                </Alert>
            </Snackbar>
        </div>

    );
};

export default LoginForm;
