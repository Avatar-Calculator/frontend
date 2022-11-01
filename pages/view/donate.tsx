import Head from 'next/head'

import Navbar from '../../comps/navbar'
import Footer from '../../comps/footer'

function Donate() {
    return (
        <div>
          <Head>
            <title>Donate</title>
          </Head>
          <div className="hero is-fullheight">
            <div className="hero-head">
              <Navbar auth={false} />
            </div>
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Donate</h1>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )
}

export default Donate;