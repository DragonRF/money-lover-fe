//register.tsx
"use client"
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
import {AuthService} from "@/app/service/auth.service";
import {SyntheticEvent, useState} from "react";
import {log} from "util";
import GoogleButton from "@/app/dashboard/components/GoogleButton/GoogleButton";
import {GoogleOAuthProvider} from "@react-oauth/google";

const SignupSchema = Yup.object().shape({
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

const RegisterForm = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [nameAlert, setNameAlert] = useState('success')

    const handleSocialLogin = (platform) => {
        // Handle the login logic for the specified social media platform
        console.log(`Logging in with ${platform}`);
    };

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            AuthService.register(values).then(res =>{
                console.log(res)
               if (res.data.status === 'success'){
                   setOpen(true)
                   setMessage("Register Success")
               } else {
                   setOpen(true)
                   setNameAlert('error')
                   setMessage(res.data.message)
               }

            }).catch(err => {
                console.log(err.message)
            })
        }
    })



    return (
        <div>
            <GoogleOAuthProvider clientId="807284928174-e331ovfkca2d1a6kdfbedkt0vg5jfl3g.apps.googleusercontent.com">
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
                            <GoogleButton/>
                        </SocialLoginContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <form onSubmit={formik.handleSubmit}>
                            <Typography variant="h6" align="center" gutterBottom>
                                Using Money Lover account
                            </Typography>
                            <TextField
                                name="email"
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.email}
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

                            <StyledButton type="submit" variant="contained" fullWidth style={{ backgroundColor: "#00bc2a" ,marginTop:15,marginBottom:15}}>
                                Sign Up
                            </StyledButton>
                        </form>
                        <Typography variant="body2" align="center">
                        Already have an account?
                            <Link component="button" href="/login" variant="body2" style={{color:"blue"}}> Login</Link>
                    </Typography>
                    </Grid>
                </FormContainer>
            </StyledCard>
        </Container>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={nameAlert} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            </GoogleOAuthProvider>
        </div>
    );
};

export default RegisterForm;
