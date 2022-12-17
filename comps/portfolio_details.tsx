import { useEffect, useState } from 'react'

import { pricesInterface } from '@utils/DTO'

type Props = {
    avatars: Map<string, number>;
    prices: pricesInterface;
    generation: string;
    ethActive: boolean;
    conversion: number;
    metric: "floor_price" | "last_sale";
}

function PortfolioDetails(props: Props) {
    const [show, setShow] = useState(false);
    const [avatars, setAvatars] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState<string>("default");

    useEffect(() => {
        if(!props.avatars) return;

        const array = props.generation === "Everything" ?
            Array.from(props.avatars.entries())
            :
            Array.from(props.avatars.entries()).filter(([key]) => { 
                return props.prices[key]['generation'] === props.generation;
            });

        setAvatars([...array]);
        changeSorting(array);
    }, [props.generation, props.avatars]);

    useEffect(() => {
        changeSorting(avatars);
    }, [sortBy, props.metric]);

    function changeSorting(avatars: any[]) {
        const tempAvatars = avatars;
        switch(sortBy) {
            case "price_low":
            case "price_high": {
                const sorter = sortBy === "price_high" ? -1 : 1;
                tempAvatars.sort(([key0], [key1]) => {
                    if(props.prices[key0][props.metric] > props.prices[key1][props.metric]) {
                        return sorter;
                    }
                    if(props.prices[key0][props.metric] < props.prices[key1][props.metric]) {
                        return sorter * -1;
                    }
                    return 0;
                });
                break;
            }
            case "total_price_low":
            case "total_price_high": {
                const sorter = sortBy === "total_price_high" ? -1 : 1;
                tempAvatars.sort(([key0, value0], [key1, value1]) => {
                    if(props.prices[key0][props.metric] * value0 > props.prices[key1][props.metric] * value1) {
                        return sorter;
                    }
                    if(props.prices[key0][props.metric] * value0 < props.prices[key1][props.metric] * value1) {
                        return sorter * -1;
                    }
                    return 0;
                });
                break;
            }
            case "change_low":
            case "change_high": {
                const sorter = sortBy === "change_high" ? -1 : 1;
                tempAvatars.sort(([key0], [key1]) => {
                    // @ts-ignore
                    if(props.prices[key0][props.metric + "_change"] > props.prices[key1][props.metric + "_change"]) {
                        return sorter;
                    }
                    // @ts-ignore
                    if(props.prices[key0][props.metric + "_change"] < props.prices[key1][props.metric + "_change"]) {
                        return sorter * -1;
                    }
                    return 0;
                });
                break;
            }
            default:
                tempAvatars.sort();
        }
        setAvatars([...tempAvatars]);
    }

    if(show && props.avatars !== undefined && props.prices !== undefined)
    {
        return (
            <div className="portfolio-details">
                <div className="self-center">
                    <button className="button is-primary-blue" onClick={() => setShow(false)}>Hide List</button>
                </div>
                <div className="sort-by">
                    <p>Sort By:</p>
                    <div className="select is-small">
                        <select onChange={(el) => setSortBy(el.target.value)}>
                            <option value="default">Alphabetically A-Z</option>
                            <option value="price_high">Price High to Low</option>
                            <option value="price_low">Price Low to High</option>
                            <option value="total_price_high">Total Price High to Low</option>
                            <option value="total_price_low">Total Price Low to High</option>
                            <option value="change_high">Change (+ve to -ve)</option>
                            <option value="change_low">Change (-ve to +ve)</option>
                        </select>
                    </div>
                </div>
                <table className="table is-bordered is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Amount Owned</th>
                            <th>Price {props.ethActive ? "(ETH)" : "(USD)"}</th>
                            <th>Total Price {props.ethActive ? "(ETH)" : "(USD)"}</th>
                            <th>Change Since Refresh</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Avatar</th>
                            <th>Amount Owned</th>
                            <th>Price {props.ethActive ? "(ETH)" : "(USD)"}</th>
                            <th>Total Price {props.ethActive ? "(ETH)" : "(USD)"}</th>
                            <th>Change Since Refresh</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        {
                            avatars.map(([key, value]) => 
                                <tr key={key}>
                                    <th><a href={props.prices[key]['hyperlink']} target="_blank" rel="noopener noreferrer">{key}</a></th>
                                    <td>{value}</td>
                                    <td>{props.ethActive ? props.prices[key][props.metric] : "$" + (props.prices[key][props.metric] * props.conversion).toFixed(2)}</td>
                                    <td>{props.ethActive ? parseFloat((props.prices[key][props.metric] * value).toFixed(5)) : "$" + (props.prices[key][props.metric] * props.conversion * value).toFixed(2)}</td>
                                    {
                                    // @ts-ignore
                                    <td>{props.prices[key][props.metric + "_change"]}%</td>
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <div className="portfolio-details">
                <div className="self-center">
                    <button className="button is-primary-blue" onClick={() => setShow(true)}>Show List</button>
                </div>
            </div>
        )
    }
    
}

export default PortfolioDetails;