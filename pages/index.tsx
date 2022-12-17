import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Footer from '../comps/footer'
import Navbar from '../comps/navbar'
import PortfolioAddress from '../comps/portfolio_address'
import PortfolioDetails from '../comps/portfolio_details'
import PortfolioOptions from '../comps/portfolio_options'
import { avatarsArrayToMap, calculatePrice } from '@utils/calculator'
import { pricesInterface } from '@utils/DTO'
import { getFirebaseApp } from '@utils/firebase'

function Home() {
  const app = getFirebaseApp();
  let analytics: Analytics;
  if(typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  const auth = getAuth(app);

  const router = useRouter();

  const [avatars, setAvatars] = useState<Map<string, number>>();
  const [ethActive, setEthActive] = useState<boolean>(true);
  const [floorPriceActive, setFloorPriceActive] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(0);
  const [conversion, setConversion] = useState<number>(0);
  const [prices, setPrices] = useState<pricesInterface>();
  const [lastSync, setLastSync] = useState<string>('Waiting on wallet address...');

  const [generationFilter, setGenerationFilter] = useState<string>("Everything");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user)
            router.push('view/dashboard');
    });
    return () => unsubscribe();
  }, [auth, router]);

  async function submit(wallet: string) {
    if(process.env.NODE_ENV === "production")
      logEvent(analytics, 'noauth_price', { address: wallet });

    setLastSync('Waiting on server response...');
    axios.get('/api/finance/avatars', { params: { wallet: wallet } })
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
      alert(err.status === 404 ?
        "An error has been detected in the server. Please check your wallet details."
        :
        "An error has been detected in the server. Please reach out for a fix."
      );
    });
  }

  function changeFloorPriceActive(bool: boolean) {
    if(floorPriceActive === bool)
      return;
      
    setFloorPriceActive(bool);
    if(prices !== undefined && avatars !== undefined) {
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

  return (
    <div>
      <Head>
        <title>Avatar Calculator</title>
      </Head>
      <div className="hero">
        <div className="hero-head">
          <Navbar auth={false} />
        </div>
        <div className="hero-body portfolio">
          <div className="container">
            <h1 className="title">What&apos;s my avatar portfolio worth?</h1>
            <PortfolioAddress submit={submit} />
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
            <PortfolioDetails avatars={avatars as Map<string, number>} prices={prices as pricesInterface} generation={generationFilter} ethActive={ethActive} conversion={conversion} metric={floorPriceActive ? "floor_price" : "last_sale"} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home