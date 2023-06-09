import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import {GoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {AuthService} from "@/app/service/auth.service";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

export default function GoogleButton() {
    const router = useRouter();
    const verifiedUserGoogle = async (token) =>{
        let decoded = jwt_decode(token);
        let data = {
            email: decoded.email,
            google_id: decoded.exp
        }
        try {
            const response = await AuthService.loginGoogle(data);
            if (response.data.status == 'success') {
                let token = response.data.data.access_token;
                localStorage.setItem('token', token);
                // dung cookie de luu token
                Cookies.set('token', token)
                await router.push('/dashboard');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                verifiedUserGoogle(credentialResponse.credential)
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        >
            <Button
                style={{marginTop: 10, backgroundColor: "#e32918"}}
                variant="contained"
                color="primary"
                startIcon={<GoogleIcon/>}
                fullWidth
            >
                Google
            </Button>
        </GoogleLogin>
    )

}