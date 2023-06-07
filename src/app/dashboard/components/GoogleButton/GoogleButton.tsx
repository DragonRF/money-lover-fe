import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import {GoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode";


export default function GoogleButton() {
    const verifiedUserGoogle = (token) =>{
        let decoded = jwt_decode(token);
        console.log(decoded)
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