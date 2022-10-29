import Head from 'next/head'

import Navbar from '../../comps/navbar'

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
                <h2 className="subtitle">Why is this app asking me about my wallet details? Is this app secure?</h2>
                <p className="has-text-justified">You should never share your wallet details with any person or site that you don&apos;t trust, this one included! That being said, the only details that this app asks for and will ever ask for is your wallet address. Wallet addresses are completely safe to share and if you&apos;re still doubtful, it&apos;s already public knowledge!</p>
                <br />
                <h2 className="subtitle">Why is it taking so long to load my portfolio value?</h2>
                <p className="has-text-justified">You might notice that if it&apos;s your first time in the past 24 hours loading your portfolio value, it might be a little slow to load. This is because the site has experienced a lot of traffic in the last few days (with a few crashes). To ensure the server stays as healthy as possible, a queue was implemented where everyone gets their portfolio calculated in order - if it is taking a long time, a lot of other people are probably also trying to calculate their wallet values as well.</p>
                <br />
                <h2 className="subtitle">The portfolio value that I was given isn&apos;t what I should have.</h2>
                <p className="has-text-justified">First of all, check the details of your portfolio. If you transfered any avatars in the last day and it isn&apos;t showing up right away, that&apos;s completely normal - you&apos;ll just need to wait another day before the NFTs appear as part of your wallet. If this is not the issue, you could contact me at /u/Nanoburste.</p>
                <br />
                <h2 className="subtitle">How is my portfolio value calculated?</h2>
                <p className="has-text-justified">So there are two metrics that calculate the net worth of your portfolio: Floor Prices, and Last Sales. The floor price option is calculated using the lowest price from that kind of avatar which a holder is selling at. The last sales option is calculated using the average of the last 3 sales from that kind of avatar. By taking the average of the last 3, fluctuations in prices that may arise from other factors such as low mint, overmint, etc, are smoothed.</p>
                <br />
                <h2 className="subtitle">Does this app also calculate the WETH / MATIC that is in my wallet?</h2>
                <p className="has-text-justified">No.</p>
                <br />
                <h2 className="subtitle">Why should I donate, what are the donations used for?</h2>
                <p className="has-text-justified">The donations will help with developing the application! With a growing community, there will be more users that will want to use this app which requires better (and more expensive) servers, databases, etc... Additionally, increased funding will allow the use of some proprietary services that are paid which will result in a faster, and more complex system. Lastly, as someone with a crippling NFT addiction, if there are extra donations left over, I may use those funds to scoop up an NFT or two. :)</p>
                <br />
                <h2 className="subtitle">I have some problems or suggestions and this didn&apos;t help me.</h2>
                <p className="has-text-justified">My Reddit username is /u/Nanoburste and I am fairly active on Reddit. Feel free to contact me!</p>
              </div>
            </div>
          </div>
        </div>
      )
}

export default FAQ;