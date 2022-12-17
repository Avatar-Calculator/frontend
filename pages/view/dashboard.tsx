import axios from 'axios'
import { User } from 'firebase/auth'
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Footer from '../../comps/footer'
import Navbar from '../../comps/navbar'
import PortfolioDetails from '../../comps/portfolio_details'
import PortfolioOptions from '../../comps/portfolio_options'
import { avatarsArrayToMap, calculatePrice } from '@utils/calculator'
import { pricesInterface } from '@utils/DTO'
import { getFirebaseApp } from '@utils/firebase'

function Dashboard() {
    const app = getFirebaseApp();
    let analytics: Analytics;
    if(typeof window !== 'undefined') {
      analytics = getAnalytics(app);
    }

    const router = useRouter();

    const [avatars, setAvatars] = useState<Map<string, number>>();
    const [ethActive, setEthActive] = useState<boolean>(true);
    const [floorPriceActive, setFloorPriceActive] = useState<boolean>(true);
    const [amount, setAmount] = useState<number>(0);
    const [conversion, setConversion] = useState<number>(0);
    const [prices, setPrices] = useState<pricesInterface>();
    const [lastSync, setLastSync] = useState<string>('Waiting on server response...');
    const [user, setUser] = useState<User>();
    const [generationFilter, setGenerationFilter] = useState<string>("Everything");

    function authCallback(user: User) {
        setUser(user);
        if(process.env.NODE_ENV === "production")
            logEvent(analytics, 'auth_price', { uid: user.uid });

        user.getIdToken().then((token) => {
            axios.get('/api/finance/avatars/auth', {
                headers: {
                    'authorization': token 
                }
            })
            .then((res) => {
                setConversion(res.data.conversion);
                setPrices(res.data.prices);
                const avatarMap = avatarsArrayToMap(res.data.avatars);
                setAvatars(avatarMap);
                const calculatedAmount = calculatePrice(res.data.prices, avatarMap, floorPriceActive, generationFilter);
                setAmount(calculatedAmount);
                const date = new Date(res.data.sync);
                setLastSync(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
            })
            .catch((err) => {
                err = err.toJSON();
                if(err.status === 404) {
                    alert("No wallet has been has been associated with your account. You are being redirected to setup your account.");
                    router.push('/account/settings');
                }
                else {
                    alert("An error has been detected in the server. Please reach out for a fix.");
                }
            })
        })
        .catch((err) => console.log(err));
    }

    function changeFloorPriceActive(bool: boolean) {
        if(floorPriceActive === bool)
            return;
        
        setFloorPriceActive(bool);
        if(user !== undefined && prices !== undefined && avatars !== undefined) {
            const calculatedAmount = calculatePrice(prices, avatars, bool, generationFilter);
            setAmount(calculatedAmount);
        }
    }

    function changeGenerationFilter(value: string) {
        setGenerationFilter(value);
        if(!prices || !avatars) return;
    
        const calculatedAmount = calculatePrice(prices, avatars, floorPriceActive, value);
        setAmount(calculatedAmount);
    }

    return(
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="hero">
                <div className="hero-head">
                    <Navbar auth={true} callback={authCallback} />
                </div>
                <div className="hero-body portfolio">
                    <div className="container">
                        <h1 className="title">Dashboard</h1>
                        <div className="values">
                            <p><strong>Portfolio Value:</strong> { ethActive ?
                                parseFloat(amount.toFixed(5)) + " ETH"
                                :
                                "$" + (amount * conversion).toFixed(2) + " USD"
                            }</p>
                            <p><strong>Last Sync At:</strong> {lastSync}</p>
                        </div>
                        <PortfolioOptions ethActive={ethActive} setEthActive={setEthActive} floorPriceActive={floorPriceActive} changeFloorPriceActive={changeFloorPriceActive} changeGenerationFilter={changeGenerationFilter} />
                        <hr />
                        <PortfolioDetails avatars={avatars as Map<string, number>} prices={prices as pricesInterface} generation={generationFilter}  ethActive={ethActive} conversion={conversion} metric={floorPriceActive ? "floor_price" : "last_sale"} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Dashboard;