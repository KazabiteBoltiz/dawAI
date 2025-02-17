import { MarketStock, Product } from '@/public/types'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { IoCheckmarkDone, IoPricetag } from 'react-icons/io5'
import { Badge } from './ui/badge'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Button } from './ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { supabase } from '@/lib/SupabaseClient'

const StockCard: React.FC<MarketStock> = (product) => {

  const [data, setData] = useState<Product[]>([])
  const [bought, setBought] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('Cart')
        .select('*')
        .eq('product_id', product.id)
      if (error) console.error(error)
      else {
        setData(data)
        if (data.length != 0) {
          setBought(true)
        }
      }
    }
    fetchData()
  }, [])

  async function onOrder() {
    const { data, error } = await supabase
      .from('Cart')
      .insert({
        product_id: product.id,
        buy_time: new Date()
      });

    if (error) {
      throw error;
    }

    console.log('Data inserted successfully:', data);
    return data;
  }

  // const [data, setData] = useState<Product[]>([])
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase
  //       .from('Cart')
  //       .select('*')
  //     if (error) console.error(error)
  //     else setData(data)
  //   }
  //   fetchData()
  // }, [])

  return (
    <Card className = 'bg-white-1 shadow-none border border-gray-2 w-full'>
      <div className = 'flex justify-between mr-3'>
        <CardHeader className = ''>
          <CardTitle className = 'text-lg flex gap-2 justify-start'>
            <Badge className = 'text-xl'>{product.item_name}</Badge>
            <IoPricetag className='w-[40px] h-max' name="pricetag"/>
          </CardTitle>
          <CardDescription className = 'text-gray-2'>
            {product.quantity}
          </CardDescription>
        </CardHeader>
        <div className = 'mt-3 flex justify-end'> 
          <AlertDialog>
              {bought ?
                <Button disabled asChild className = 'rounded-full bg-gray-2 w-10 h-10 p-0 ' variant = 'link'>
                  <IoCheckmarkDone className = 'stroke-white-1 fill-blue-5 w-10 h-10'/>
                </Button>
              : 
              <AlertDialogTrigger>
                <Button asChild className = 'rounded-full bg-gray-2 w-10 h-10 p-0 ' variant = 'link'>
                  <IoAddCircleOutline className = 'stroke-white-1 w-10 h-10'/>
                </Button>
              </AlertDialogTrigger>
              }
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Buy {product.item_name}</AlertDialogTitle>
                <AlertDialogDescription>
                  by {product.manufacturer}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onOrder}>ORDER NOW</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <CardContent className = 'flex justify-between gap-10'>
        <div>
          <p className = 'text-gray-2 text-xl'>
            Expires on <b>{new Date(product.expiry_date).toLocaleDateString()}</b>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StockCard