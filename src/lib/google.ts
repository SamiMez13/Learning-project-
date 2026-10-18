import {GoogleAuth, OAuth2Client} from 'google-auth-library' ;
import { env } from '../config/env';
import { AppError } from '../errors/AppError';


export type GoogleUserProfile = {
    googleId : string ;
    email : string ;
}

const GoogleOauthClient = new OAuth2Client({
    clientId : env.googleClientId,
    clientSecret : env.googleClientSecret,
    redirectUri : env.googleRedirectUrl,
})



export function getGoogleAuthUrl()  :string {
    return GoogleOauthClient.generateAuthUrl({
        access_type: "offline",
        scope: [ "openid" , "email" ,"profile"],
        prompt : "select_account",
    });
}

export async function getGoogleUserFromAuthCode(code : string ) : Promise<GoogleUserProfile> {
    if (!code) {
        throw new AppError(400, 'Google auth code is required .')
    }

    const {tokens} = await GoogleOauthClient.getToken(code)  ;

    if (!tokens.id_token){
        throw new AppError(401,"Failed to get id token")
    }


    const ticketInfo = await  GoogleOauthClient.verifyIdToken({
        idToken : tokens.id_token,
        audience : env.googleClientId,
    })
    

    const payload = ticketInfo.getPayload()

    if (!payload?.email || !payload.sub){
        throw new AppError(401,"Failed to get user profile")
    }

    return {
        googleId : payload.sub,
        email : payload.email.toLowerCase().trim()
    }

}
