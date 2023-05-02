export interface Iproduct {
    id:string,
    catid: string,
    subid: string,
    name: string,
    name_ar:string,
    details: string[],
    details_ar: string[],
    size: Map<string, number>,
    colors: Map<string, number>,
    colors_ar: Map<string, number>,
    imgs: string[],
    offer: boolean,
    quantity:number,
    old_price: number,
    new_price: number,
    discount: number,
}
