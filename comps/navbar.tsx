import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getFirebaseApp } from '@utils/firebase'

type Props = {
    auth:boolean;
    callback?:(auth:User) => void;
}

function Navbar(props : Props) {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    
    const router = useRouter();

    const [mobileActive, setMobileActive] = useState(false);
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(props.auth && !user)
                router.push('/account/login');
            if(user)
                setUser(user);
            if(props.callback !== undefined && user)
                props.callback(user);
        });
        return () => unsubscribe();
    }, []);

    const signOutFirebase = () => {
        signOut(auth)
        .then(() => {
            router.push('/');
            setUser(null);
        });
    }
  
    return(
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand mr-4">
                <Link href="/">
                    <p className="navbar-item title is-size-5-touch m-0">Avatar Portfolio Calculator</p>
                </Link>
                <a role="button" className={mobileActive ? "is-active navbar-burger" : "navbar-burger"} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setMobileActive(!mobileActive)}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={mobileActive ? "is-active navbar-menu" : "navbar-menu"}>
                <div className="navbar-start">
                    <a className="navbar-item img" target="_blank" href="https://discord.gg/JXnY3w3SXM">
                        <img src="/discord.svg" width="30px" height="30px" />
                        <span>Discord</span>
                    </a>
                </div>
                {
                    user ?
                    <div className="navbar-end">
                        <Link href="/view/donate">
                            <a className="navbar-item mr-4">
                                Donate
                            </a>
                        </Link>
                        <Link href="/account/settings">
                            <a className="navbar-item mr-4">
                                Settings
                            </a>
                        </Link>
                        <div className="navbar-item">
                            <button className="button is-dark" onClick={() => signOutFirebase()}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                    :
                    <div className="navbar-end">
                        <Link href="/view/faq">
                            <a className="navbar-item mr-4">
                                FAQ
                            </a>
                        </Link>
                        <Link href="/view/donate">
                            <a className="navbar-item mr-4">
                                Donate
                            </a>
                        </Link>
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link href="/account/join">
                                    <a className="button mr-4">
                                        Sign up
                                    </a>
                                </Link>
                                <Link href="/account/login">
                                    <a className="button is-dark">
                                        Log in
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navbar;