'use client'

import React, { useEffect, useState } from 'react'
import { IoSearch, IoAddCircle } from "react-icons/io5";
import ProductCard from '@/components/ProductCard';
import { MarketStock, Product, ProductID } from '@/public/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/SupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/logo';

const ProductCards = () => {

  const [data, setData] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: cartData, error: cartError } = await supabase
        .from('Cart')
        .select('*')

      if (cartError) {
        console.error(cartError)
        return
      }

      if (cartData.length === 0) {
        console.log('Got Null Product IDs')
        return
      }

      const cartIds = cartData.map(item => item.product_id)

      const { data: marketData, error: marketError } = await supabase
        .from('Market')
        .select('*')
        .in('id', cartIds)

      if (marketError) {
        console.error(marketError)
        return
      }

      const combinedData = marketData.map(product => {
        const cartItem = cartData.find(item => item.product_id === product.id)
        return {
          ...product,
          buy_time: cartItem ? new Date(cartItem.buy_time) : undefined
        }
      })

      setData(combinedData)
    }
    
    fetchData()
  }, [])

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCells, setFilteredCells] = useState(data);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = data.filter(dataCell =>
      dataCell.item_name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredCells(filtered);
  };

  return (
    <div className = ''>
      <div className = 'flex flex-start mb-5 pt-4 pl-4 underline text-5xl'>
        दव<p className = 'font-bold'>AI</p>
        <Logo/>
      </div>
      <ScrollArea className = 'h-full w-full mt-6 p-4'>
        <div className = 'font-bold text-lg'>
          Your Cart
        </div>
        <div className="flex">
          <div className="p-2 flex flex-w-full bg-white-1 gap-5 justify-start mt-2 mb-2 rounded-full border-[1px] border-gray-2 w-full h-max">

            <IoSearch className="w-6 h-6 my-auto ml-2" />

            <div className="flex flex-col h-max w-full justify-center">
              <Input
                type="text"
                placeholder="Search drugs..."
                value={searchTerm}
                onChange={handleSearch}
                className="align-center p-0 h-full w-full text-gray-3 border-none focus:outline-none" // Added border-none and focus:outline-none for better appearance
              />
            </div>
          </div>
        </div>
        <div className = 'w-full flex flex-col gap-2 mt-2'>
          {searchTerm == '' ? data.map((thisProduct, _) => (
            <ProductCard key = {thisProduct.item_name} {...thisProduct}/>
          )) : filteredCells.map((thisProduct, _) => (
            <ProductCard key = {thisProduct.item_name} {...thisProduct}/>
          ))}
        </div>
      </ScrollArea>
      <div className = 'flex justify-end'>
        <Button asChild variant = 'link' className = 'p-0 text-teal-4 font-bold'>
            <link href='/'/>
        </Button>
      </div>
      <></>
    </div>
  )
}

export default ProductCards