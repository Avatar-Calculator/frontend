export interface pricesInterface { 
    [key:string]: { 
        floor_price: number, 
        floor_price_change: number, 
        last_sale: number, 
        last_sale_change: number, 
        generation: string, 
        hyperlink: string 
    }
};

export interface timesereiesInterface { 
    [key:string]: timeseriesUnitInterface[]
}

export interface timeseriesUnitInterface {
    floor_price: number,
    last_sale: number,
    createdAt: Date
}