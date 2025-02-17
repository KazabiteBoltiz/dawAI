export interface Product {
  product_id : bigint,
  item_name : string,
  stock : number,
  quantity : string
  expiry_date : Date,
  buy_time : Date,
  manufacturer : string | undefined,
  price : number | undefined 
} 

export interface ProductID {
  id : bigint
}

export type MarketStock = {
  id : bigint,
  item_name : string,
  expiry_date : Date,
  quantity : string,
  manufacturer : string | undefined
}