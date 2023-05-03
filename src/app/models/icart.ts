
export interface Cart{
    id? : string,
    name? : string, 
    imgs? : string[],
    new_price? : number,
    quantity? : string 
}

export interface Icart
{
  id:string,
  name:string,
  size: string,
  color: string,
  color_ar: string
  img: string,
  quantity:number,
  price:number,
  totalPrice?:number,
  name_ar:string,
}

