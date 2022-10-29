import { FormEvent, useEffect, useState } from 'react'

type Props = {
    submit(wallet: string): Promise<void>;
}

function WalletAddress(props: Props) {
    const [oldWallet, setOldWallet] = useState<string>('');
    const [wallet, setWallet] = useState<string>('');
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [favourite, setFavourite] = useState<boolean>(false);
    const [favouriteWallets, setFavouriteWallets] = useState<string[]>([]);

    useEffect(() => {
        const unparsedWallets = localStorage.getItem('wallets');
        if(!unparsedWallets) {
            localStorage.setItem('wallets', JSON.stringify([]));
            return;
        }
        setFavouriteWallets([...JSON.parse(unparsedWallets)]);
    }, []);

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const Web3Utils = (await import('web3-utils')).default;

        if(wallet === oldWallet) return;
        if(Web3Utils.isAddress(wallet) === false || wallet.substring(0, 2) !== '0x')
          return alert('The wallet address is not valid.');
    
        setOldWallet(wallet);
        setButtonLoading(true);

        await props.submit(wallet);
        
        setButtonLoading(false);
    }

    function updateWallet(val: string) {
        findFavourite(val);
        setWallet(val);
    }

    function findFavourite(val: string) {
        if(favouriteWallets.includes(val) && !favourite) {
            setFavourite(true);
        }
        else if(!favouriteWallets.includes(val) && favourite) {
            setFavourite(false);
        }
    }

    async function toggleFavourite() {
        let tempFavourites = favouriteWallets;
        if(favourite) {
            const index = tempFavourites.indexOf(wallet);
            tempFavourites.splice(index, 1);
        }
        else {
            const Web3Utils = (await import('web3-utils')).default;
            if(Web3Utils.isAddress(wallet) === false || wallet.substring(0, 2) !== '0x')
              return alert('The wallet address is not valid.');
            tempFavourites.push(wallet);
        }
        setFavouriteWallets([...tempFavourites])
        localStorage.setItem('wallets', JSON.stringify(tempFavourites));
        findFavourite(wallet);
    }

    return (
        <div>
            <label className="label">Wallet Address</label>
            <form className="field is-grouped" onSubmit={(e) => submit(e)}>
                <div className="control is-expanded has-icons-right">
                    <input className="input" type="text" list="favourites" value={wallet} onChange={(e) => {updateWallet(e.target.value)}} />
                    <span className="icon is-right p-2 star" onClick={() => toggleFavourite()}>
                        <Star active={favourite} />
                    </span>
                    <datalist id="favourites">
                        {
                            favouriteWallets.map((value) => 
                                <option>{value}</option>
                            )
                        }
                    </datalist>
                </div>
                <div className="control">
                    {
                        buttonLoading ?
                        <button className="button is-dark is-loading">Submit</button>
                        :
                        <button className="button is-dark" type="submit">Submit</button>
                    }
                </div>
            </form>
        </div>
    )
}

function Star(props: { active: boolean; }) {
    if(props.active) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                {/* Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
            </svg>
        )
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            {/* Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
            <path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" />
        </svg>
    )
}

export default WalletAddress;