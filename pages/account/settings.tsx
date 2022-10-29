import axios from 'axios'
import { getAuth, sendPasswordResetEmail, User } from 'firebase/auth'
import Head from 'next/head'
import { useState } from 'react'

import Navbar from '../../comps/navbar'
import { getFirebaseApp } from '@utils/firebase'

function Settings() {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    const [email, setEmail] = useState<string>('');
    const [opensea, setOpensea] = useState<string>('');

    function authCallback(user: User) {
        if(user.email)
            setEmail(user.email);

        user.getIdToken().then((token) => {
            axios.get('/api/account/wallets', {
                headers: {
                    'authorization': token 
                }
            })
            .then((res) => {
                setOpensea(res.data.wallets.join(", "));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }

    async function handleClick() {
        const Web3Utils = (await import('web3-utils')).default;

        const wallets = opensea.split(",").map((obj) => obj.trim());

        for(let wallet of wallets) {
            if(Web3Utils.isAddress(wallet) === false || wallet.substring(0, 2) !== '0x')
                return alert('One or more of the wallet addresses are not valid.');
        }

        auth.currentUser?.getIdToken().then((token) => {
            axios.post('/api/account/wallets', wallets, {
                headers: {
                    'authorization': token 
                }
            })
            .then(() => alert("Settings saved!"))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }

    function resetPassword() {
        if(auth.currentUser && auth.currentUser.email)
            sendPasswordResetEmail(auth, auth.currentUser.email)
            .then(() => alert("Password Reset Email Sent. Make sure to check your spam folder."))
            .catch((err) => console.log(err));
    }

    return(
        <div>
            <Head>
                <title>Settings</title>
            </Head>
            <div className="hero is-fullheight">
                <div className="hero-head">
                    <Navbar auth={true} callback={authCallback} />
                </div>
                <div className="hero-body">
                    <div className="container is-flex is-flex-direction-column">
                        <h1 className="title">Settings</h1>

                        <div className="field">
                            <label className="label">Wallet Addresses</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="0x3bcdA61F0dd6D571134BDDf2AE0CBB0F55021f42, 0x96a16f15Ea9204b3742156af19649DBfdAFd7B16" value={opensea} onChange={(e) => {setOpensea(e.target.value)}} />
                            </div>
                            <p>You can have multiple addresses! Seperate them with a comma between each wallet address.</p>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="text" disabled={true} value={email} />
                            </div>
                        </div>

                        <div className="is-align-self-flex-end buttons">
                            <button className="button" onClick={() => resetPassword()}>Reset Password</button>
                            <button className="button is-dark" onClick={() => handleClick()}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;