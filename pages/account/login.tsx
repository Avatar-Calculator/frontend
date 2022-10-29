import { AuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { getFirebaseApp } from '@utils/firebase'

function Login() {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [err, setErr] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user)
                router.push('/view/dashboard');
        });
        return () => unsubscribe();
    }, [auth, router]);

    const federatedLogIn = (provider: AuthProvider) => {
        signInWithPopup(auth, provider)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    };

    const signIn = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
        .catch(() => {
            setErr(true);
        });
    };

    return(
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container is-flex is-flex-direction-column">
                        <Link href="/">
                            <a>Back to Home Page</a>
                        </Link>
                        <h1 className="title">Login</h1>
                        <div className="is-align-self-center">
                            <button className="google-btn" onClick = {() => federatedLogIn(googleProvider)} type="button">Sign in with Google</button>
                        </div>
                        <p className="is-align-self-center">OR</p>
                        { err ? <label className="is-align-self-center has-text-danger">Login unsuccessful. Please try again.</label> : <span /> }
                        
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                            </div>
                        </div>

                        <p className="is-align-self-flex-end"><Link href="/account/forgotpassword"><a>Forgot Password?</a></Link></p>
                
                        <div className="is-align-self-center">
                            <button className="button is-dark" onClick = {() => {signIn(email, password)}}>Sign In</button>
                        </div>
                        
                        <p className="is-align-self-flex-end">Don&apos;t have an account? <Link href="/account/join"><a>Join</a></Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;