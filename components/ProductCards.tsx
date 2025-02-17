'use client'

import React, { useEffect, useState } from 'react'
import { IoSearch, IoAlertCircle, IoFunnel, IoFilter } from "react-icons/io5";
import ProductCard from './ProductCard';
import { MarketStock, Product, ProductID } from '@/public/types';
import { ScrollArea } from './ui/scroll-area';
import { supabase } from '@/lib/SupabaseClient';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const ProductCards = () => {

  const [data, setData] = useState<Product[]>([])
  const [filter, setFilter] = useState<'closest' | 'farthest' | ''>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCells, setFilteredCells] = useState(data)

  useEffect(() => {
    const fetchData = async () => {
      const { data: cartData, error: cartError } = await supabase
        .from('Owned')
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
      setFilteredCells(combinedData)
    }
    
    fetchData()
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = data.filter(dataCell =>
      dataCell.item_name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredCells(filtered);
  };

  const handleFilter = (filterType: 'closest' | 'farthest') => {
    setFilter(filterType)
    const sortedData = [...data].sort((a, b) => {
      if (a.expiry_date && b.expiry_date) {
        return filterType === 'closest' 
        ? new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime() 
        : new Date(b.expiry_date).getTime() - new Date(a.expiry_date).getTime()
      }
      return 0
    })
    setFilteredCells(sortedData)
  }

  return (
    <div className = ''>
      <ScrollArea className = 'h-full w-full mt-10'>
          <div className = 'flex justify-end'>
            <IoAlertCircle className = 'stroke-orange-2 h-10 w-10'/>
          </div>
        <div className = 'flex justify-between font-bold text-lg'>
          <div className = 'ml-2'>
            Current Stock
          </div>
        </div>
        <div className="flex">
          <div className="p-1 flex flex-w-full bg-white-1 gap-5 justify-start mt-2 mb-2 rounded-full border-[1px] border-gray-2 w-full h-max">

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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant = 'default' className = 'rounded-full ml-2 pt-2 pb-1'>
                <IoFunnel/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className = ''>By Expiry</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilter('closest')}>Closest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter('farthest')}>Farthest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className = 'bg-gray-2'>
            {/* <> TODO </> */}
          </div>
        </div>
        <div className = 'w-full flex flex-col gap-2 mt-2'>
          {filteredCells.map((thisProduct, _) => (
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