export interface Iproduct {
    id:string,
    catid: string,
    subid: string,
    name: string,
    details: string[],
    size: Map<string, number>,
    colors: Map<string, number>,
    imgs: string[],
    offer: boolean,
    old_price: number,
    new_price: number,
    discount: number,
}
