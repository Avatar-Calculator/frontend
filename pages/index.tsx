import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { avatarsArrayToMap, calculatePrice } from '../comps/calculator'
import { pricesInterface } from '../comps/DTO'
import Navbar from '../comps/navbar'
import Details from '../comps/portfolio_details'
import WalletAddress from '../comps/wallet_address'
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

  function changeEthActive(bool: boolean) {
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
      <div className="hero is-fullheight">
        <div className="hero-head">
          <Navbar auth={false} />
        </div>
        <div className="hero-body">
          <div className="container is-flex is-flex-direction-column is-align-items-center">
            <h1 className="title">What&apos;s my avatar portfolio worth?</h1>
            <article className="message">
              <div className="message-header subtitle">
                <p>If you found this tool useful, consider supporting this project: <span className="has-background-light has-text-dark p-2 padded">0x3bcdA61F0dd6D571134BDDf2AE0CBB0F55021f42</span></p>
              </div>
              <div className="message-body subtitle">
                <WalletAddress submit={submit} />
                <div className="portfolio mt-3">
                  <div className="values">
                    <p className="my-2"><strong>Portfolio Value:</strong> { ethActive ?
                        parseFloat(amount.toFixed(5)) + " ETH"
                        :
                        "$" + (amount * conversion).toFixed(2) + " USD"
                    }</p>
                    <p className="my-2"><strong>Last Sync At:</strong> {lastSync}</p>
                    <p>This site is now avatarcalculator.com. Be sure to spread the word!</p>
                    <p>NOTE: IT HAS COME TO MY ATTENTION THAT SCAMMERS ARE USING THIS SITE TO MAKE THEIR WELCOME POSTS SEEM LEGITIMATE - MODS WILL NEVER LINK YOU TO THIS SITE. IF YOU&apos;RE NOT SURE IF YOU&apos;RE BEING SCAMMED - SEND /u/Nanoburste A MESSAGE.</p>
                    <p>EXAMPLES OF THESE SCAMS CAN BE SEEN <a href="https://www.reddit.com/r/avatartrading/comments/ydh6ne/hey_noobs_here_is_an_example_of_something_you/">HERE</a> AND <a href="https://www.reddit.com/r/avatartrading/comments/ydsczg/got_a_warm_welcome_from_scammer_dont_accept_dm/">HERE</a>.</p>
                  </div>
                  <div className="parameters">
                    <div className="field has-addons">
                      <p className="control m-0">
                        <button className={ethActive ? "button is-dark is-focused" : "button"} onClick={() => {setEthActive(true)}}>ETH</button>
                      </p>
                      <p className="control m-0">
                        <button className={ethActive ? "button" : "button is-dark is-focused"} onClick={() => {setEthActive(false)}}>USD</button>
                      </p>
                    </div>
                    <div className="field has-addons">
                      <p className="control m-0">
                        <button className={floorPriceActive ? "button is-dark is-focused" : "button"} onClick={() => {changeEthActive(true)}}>Floor Price</button>
                      </p>
                      <p className="control m-0">
                        <button className={floorPriceActive ? "button" : "button is-dark is-focused"} onClick={() => {changeEthActive(false)}}>Last Sales Price</button>
                      </p>
                    </div>
                    <div className="is-flex is-align-items-center">
                      <p className="mr-2 is-size-6">Filter by Generation:</p>
                      <div className="select is-small">
                        <select onChange={(el) => changeGenerationFilter(el.target.value)}>
                          <option>Everything</option>
                          <option>Generation 1</option>
                          <option>Generation 2</option>
                          <option>Free</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <Details avatars={avatars as Map<string, number>} prices={prices as pricesInterface} generation={generationFilter} ethActive={ethActive} conversion={conversion} metric={floorPriceActive ? "floor_price" : "last_sale"} />
          </div>
        </div>
        <div className="hero-foot">
          <p className="has-text-centered">If your company is hiring new grads, message me :)</p>
          <p className="has-text-centered">This site is neither a creation of, nor an affiliation with Reddit, and OpenSea.</p>
        </div>
      </div>
    </div>
  )
}

export default Home