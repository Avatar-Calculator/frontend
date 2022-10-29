export function calculatePrice(prices: { [key:string]: { floor_price: number, last_sale: number, generation: string }}, avatars: Map<string, number>, floorPrice: boolean, generation: string) {
    //metric === true is floor_price & metric === false is last_sales
    const metric = floorPrice ? 'floor_price' : 'last_sale';

    let result = 0;
    if(generation === "Everything") {
        for(let [key, value] of Array.from(avatars.entries())) {
            result = result + (prices[key][metric] * value);
        }
    }
    else {
        for(let [key, value] of Array.from(avatars.entries())) {
            if(prices[key].generation === generation)
                result = result + (prices[key][metric] * value);
        }
    }

    return result;
}

export function avatarsArrayToMap(avatars: string[]) {
    let collection = new Map();
    
    for(let avatar of avatars) {
        if(collection.has(avatar)) {
            collection.set(avatar, collection.get(avatar) + 1);
        }
        else {
            collection.set(avatar, 1);
        }
    }

    return collection;
}