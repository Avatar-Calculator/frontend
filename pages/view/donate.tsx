import Head from 'next/head'

import Navbar from '../../comps/navbar'
import Footer from '../../comps/footer'

function Donate() {
    return (
        <div>
          <Head>
            <title>Donate</title>
          </Head>
          <div className="hero">
            <div className="hero-head">
              <Navbar auth={false} />
            </div>
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Donate/Get Premium</h1>
                <h2 className="subtitle">Why donate?</h2>
                <p className="has-text-justified">The donations will help with developing the application! I&apos;m currently a part time college student dedicating between 20-40 hours/week minimum on this project. The donations will be used to help improve the infrastructure of 
                    the application as well as some compensation for my development. Some infrastructure upgrades that cost money are: premium database, multiple servers, load balancer, premium node provider, proxies.</p>
                <h2 className="subtitle">Why is there a premium feature? What does premium give me?</h2>
                <p className="has-text-justified">Currently, premium doesn&apos;t give you too many benefits and isn&apos;t worth it. The reason why this application has a premium option is because some users use this application a lot more than others - that increased usage comes with 
                    direct and indirect costs. The premium plan is meant for users who would like to use the application multiple times/day or have insights when they can&apos;t always check. It is planned that free users will always have the same features as premium users at a 
                    rate that does not take up as much server resources as premium members. Premium will be handled through Patreon which will be built after the charts update.</p>
                <h2 className="subtitle">Methods</h2>
                <p><strong>Patreon: </strong>COMING SOON</p>
                <p><strong>Polygon Network: </strong>MATIC or WETH (Wallet Address: 0x3bcdA61F0dd6D571134BDDf2AE0CBB0F55021f42)</p>
                <p><strong>Ethereum Network: </strong>ETH (Wallet Address: 0x3bcdA61F0dd6D571134BDDf2AE0CBB0F55021f42)</p>
                <p><strong>Reddit: </strong>Gift Avatars or MOONS (Username: u/Nanoburste)</p>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )
}

export default Donate;