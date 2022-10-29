import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getFirebaseApp } from '@utils/firebase'

const errorMessages : { [key:string]: string } = {
    'nonmatching-passwords': 'Those passwords didn\'t match, please try again.',
    'auth/weak-password': 'The password is too weak, please try again.',
    'auth/email-already-in-use': 'This email is already in use.',
    'auth/invalid-email': 'Email is invalid, please try again.'
}

function Join() {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user)
                router.push('/view/dashboard');
        });
        return () => unsubscribe();
    }, [auth, router]);

    function handleEmailPassAccountCreation(email: string, password: string, confirmPassword: string) {
        if(password !== confirmPassword) {
            setErrMsg(errorMessages['nonmatching-passwords']);
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .catch((err) => {
            setErrMsg(errorMessages[err.code] ? errorMessages[err.code] : err.code);
        });
    }

    return(
        <div>
            <Head>
                <title>Register</title>
            </Head>
            <div className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container is-flex is-flex-direction-column">
                        <Link href="/">
                            <a>Back to Home Page</a>
                        </Link>
                        <h1 className="title">Register</h1>

                        { errMsg.length > 0 ? <label className="is-align-self-center has-text-danger">{errMsg}</label> : <span /> }

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

                        <div className="field">
                            <label className="label">Confirm Password</label>
                            <div className="control">
                                <input className="input" type="password" value={password2} onChange={(e) => {setPassword2(e.target.value)}} />
                            </div>
                        </div>

                        <p className="is-align-self-flex-end">Already have an account? <Link href="/account/login"><a>Login</a></Link></p>

                        <div className="is-align-self-center">
                            <button className="button is-dark" onClick={() => handleEmailPassAccountCreation(email, password, password2)}>Join</button>
                        </div>

                        <p className="is-align-self-center">Reddit wallet accounts can be added in the settings page.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Join;