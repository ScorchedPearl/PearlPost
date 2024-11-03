import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function App({Component,pageProps}:AppProps){
 return(
  <div>
  <GoogleOAuthProvider clientId="455624080761-2e7vh29o5qldeimm6qn96qaqjhhgk85h.apps.googleusercontent.com">
    <Component {...pageProps}></Component>
  </GoogleOAuthProvider>
  </div>
 )
}