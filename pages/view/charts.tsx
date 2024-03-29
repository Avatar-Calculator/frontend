import axios from "axios";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";

import Chart from "../../comps/chart";
import Navbar from "../../comps/navbar";
import Footer from "../../comps/footer";
import { timesereiesInterface } from "@utils/DTO";

function Charts() {
  const [timeseries, setTimeseries] = useState<timesereiesInterface>();
  const [input, setInput] = useState<string>('');
  const [chartName, setChartName] = useState<string>();

  useEffect(() => {
    axios
      .get("/api/finance/avatars/timeseries")
      .then((res) => {
        setTimeseries(res.data.timeseries);
      })
      .catch(() => {
        alert(
          "An error has been detected in the server. Please reach out for a fix."
        );
      });
  }, []);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(Object.keys(timeseries || []).includes(input) === false) {
        alert("Please enter a valid avatar name.");
    }
    else {
        setChartName(input);
    }
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
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Avatar Pricing History</h1>
            <label className="label">Avatar</label>
            <form className="field is-grouped" onSubmit={(e) => submit(e)}>
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  list="avatars"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <datalist id="avatars">
                  {Object.keys(timeseries || []).map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </datalist>
              </div>
              <div className="control">
                <button className="button is-primary-blue" type="submit">
                  Submit
                </button>
              </div>
            </form>
            {timeseries === undefined || chartName === undefined ? (
              <p>Waiting on an input.</p>
            ) : (
              <div>
                <Chart title={chartName + " 24 Hour Price History (ETH)"} timeseries={timeseries[chartName]} />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Charts;
