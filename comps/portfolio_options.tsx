type Props = {
    ethActive: boolean;
    setEthActive:(ethActive:boolean) => void;
    floorPriceActive: boolean;
    changeFloorPriceActive:(floorPriceActive:boolean) => void;
    changeGenerationFilter:(value:string) => void;
}

function PortfolioOptions(props: Props) {
    return (
        <details className="portfolio-options">
			<summary>Options</summary>
            <div className="parameters">
                <div>
                    <p>Currency</p>
                    <div>
                        <button className={props.ethActive ? "is-focused" : ""} onClick={() => {props.setEthActive(true)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/>
                            </svg>
                        </button>
                        <button className={props.ethActive ? "" : "is-focused"} onClick={() => {props.setEthActive(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c10.6 1.6 42.1 6.7 55.1 10c17.1 4.3 27.5 21.7 23.2 38.9s-21.7 27.5-38.9 23.2c-9.3-2.4-37.6-7-48.9-8.7c-32.1-4.8-59.6-2.4-78.5 4.9c-18.3 7-25.9 16.9-27.9 28c-1.9 10.7-.5 16.8 1.3 20.6c1.9 4 5.6 8.5 12.9 13.4c16.2 10.8 41.1 17.9 73.3 26.7l2.8 .8c28.4 7.7 63.2 17.2 89 34.3c14.1 9.4 27.3 22.1 35.5 39.7c8.3 17.8 10.1 37.8 6.3 59.1c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.2-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.4 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.7 .5-16.8-1.3-20.6c-1.9-4-5.6-8.5-12.9-13.4c-16.2-10.8-41.1-17.9-73.3-26.7l-2.8-.8c-28.4-7.7-63.2-17.2-89-34.3c-14.1-9.4-27.3-22.1-35.5-39.7c-8.3-17.8-10.1-37.8-6.3-59.1C25 114.1 53 89.3 86 76.7c13-5 27.2-8.2 42-10V32c0-17.7 14.3-32 32-32z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <p>Display</p>
                    <div>
                        <button className={props.floorPriceActive ? "is-focused" : ""} onClick={() => {props.changeFloorPriceActive(true)}}>Floor Price</button>
                        <button className={props.floorPriceActive ? "" : "is-focused"} onClick={() => {props.changeFloorPriceActive(false)}}>Last Sales</button>
                    </div>
                </div>
                <div>
                    <p>Filter by Generation</p>
                    <div className="select is-small">
                        <select onChange={(el) => props.changeGenerationFilter(el.target.value)}>
                            <option>Everything</option>
                            <option>Generation 1</option>
                            <option>Generation 2</option>
                            <option>Free</option>
                        </select>
                    </div>
                </div>
            </div>
		</details>
    )
}

export default PortfolioOptions;