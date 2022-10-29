import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getFirebaseApp } from '@utils/firebase'

function ForgotPassword() {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user)
                router.push('/view/dashboard');
        });
        return () => unsubscribe();
    }, [auth, router]);

    const sendReset = (email: string) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setErr(false);
            setSuccess(true);
        })
        .catch(() => {
            setSuccess(false);
            setErr(true);
        });
    };
  
    return(
        <div>
            <Head>
                <title>Reset Password</title>
            </Head>
            <div className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container is-flex is-flex-direction-column">
                        <Link href="/">
                            <a>Back to Home Page</a>
                        </Link>
                        <h1 className="title">Forgot your password?</h1>
                        <p className="subtitle">Enter the email address associated with your account and we&apos;ll send a link to reset your password.</p>

                        {
                            success ?
                            <label className="has-text-success">Email successfully sent.</label> 
                            :
                            <span />
                        }

                        {
                            err ?
                            <label className="has-text-danger">Request unsuccessful. Please try again.</label> 
                            :
                            <span />
                        }

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            </div>
                        </div>

                        <p className="is-align-self-flex-end">Remember your password? <Link href="/account/login"><a>Login</a></Link></p>

                        <div className="is-align-self-center">
                            <button className="button is-dark" onClick={() => sendReset(email)}>Send password reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;