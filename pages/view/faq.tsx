import Head from 'next/head'
import Link from 'next/link'

import Navbar from '../../comps/navbar'
import Footer from '../../comps/footer'

function FAQ() {
    return (
        <div>
          <Head>
            <title>FAQs</title>
          </Head>
          <div className="hero is-fullheight">
            <div className="hero-head">
              <Navbar auth={false} />
            </div>
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Frequently Asked Questions</h1>
                <br />
                <h2 className="subtitle">Is this app secure?</h2>
                <p className="has-text-justified">This app only asks for your wallet address. Wallet addresses are completely safe to share because they are public knowledge. This app will never ask for your 12-24 word private key. Some scammers are using this site to make 
                  their sites seem legitimate. Mods will never link you to this site. Examples of scams can be found <a href="https://www.reddit.com/r/avatartrading/comments/ydh6ne/hey_noobs_here_is_an_example_of_something_you/">here</a> and <a href="https://www.reddit.com/r/avatartrading/comments/ydsczg/got_a_warm_welcome_from_scammer_dont_accept_dm/">here</a>.</p>
                <br />
                <h2 className="subtitle">How is my portfolio value calculated?</h2>
                <p className="has-text-justified">There are two metrics that calculate the net worth of your portfolio: Floor Prices, and Last Sales. The floor price option is calculated using the lowest price from that kind of avatar which a holder is selling at. The last 
                  sales option is calculated using the average of the last 3 sales from that kind of avatar. By taking the average of the last 3, fluctuations in prices that may arise from other factors such as low mint, overmint, etc, are smoothed.</p>
                <br />
                <h2 className="subtitle">The portfolio value that I was given isn&apos;t what I should have.</h2>
                <p className="has-text-justified">First of all, check the details of your portfolio. If you transfered any avatars in the last day and it isn&apos;t showing up right away, that&apos;s completely normal because this app uses caching to stay low on costs and 
                  high on performance. Wallets are currently cached for 12 hours by default. If this is not the issue, please notify me on the <a href="https://discord.gg/JXnY3w3SXM">Discord server</a>.</p>
                <br />
                <h2 className="subtitle">Does this app also calculate the WETH / MATIC / MOONS / BRICKS that is in my wallet?</h2>
                <p className="has-text-justified">No.</p>
                <br />
                <h2 className="subtitle">Why should I donate, what are the donations used for?</h2>
                <p className="has-text-justified">The donations will help with developing the application! I'm currently a part time college student dedicating between 20-40 hours/week minimum on this project. The donations will be used to help improve the infrastructure 
                  of the application as well as some compensation for my development. Please visit the <Link href="/view/donate">donation page</Link> for more info.</p>
                <br />
                <h2 className="subtitle">I have some problems or suggestions and this didn&apos;t help me.</h2>
                <p className="has-text-justified">Please join the <a href="https://discord.gg/JXnY3w3SXM">Discord server</a> and let me know!</p>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )
}

export default FAQ;