'use client'

import { supabase } from '@/lib/SupabaseClient'
import React, { useEffect, useState } from 'react'
import { IoMedkit, IoSearch, IoFilter, IoFunnel } from 'react-icons/io5'
import { MarketStock } from '@/public/types'
import StockCard from '@/components/StockCard'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Logo from '@/components/logo'

const Page = () => {
  const [data, setData] = useState<MarketStock[]>([])
  const [filter, setFilter] = useState<'closest' | 'farthest' | ''>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCells, setFilteredCells] = useState<MarketStock[]>([])

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('Market')
        .select('*')
      if (error) console.error(error)
      else setData(data)
    }
    fetchData()
  }, [])

  // Update filteredCells whenever data changes
  useEffect(() => {
    setFilteredCells(data)
  }, [data])

  // Handle filter by expiry date
  const handleFilter = (filterType: 'closest' | 'farthest') => {
    setFilter(filterType)

    if (!data) {
      return
    }

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

  // Handle search by item name
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)

    if (term === '') {
      setFilteredCells(data) // Reset to all data when search term is empty
      return
    }

    const filtered = data.filter(dataCell =>
      dataCell.item_name.toLowerCase().includes(term.toLowerCase())
    )

    setFilteredCells(filtered)
  }

  return (
    <div className="w-full h-screen p-4 bg-blue-6">
      <div className="flex mb-10 pl-2 underline text-4xl">
        दव<p className="font-bold">AI</p>
        <Logo/>
      </div>

      <div className = 'pl-2 font-bold text-lg'>
        Medicine Market
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
              className="align-center p-0 h-full w-full text-gray-3 border-none focus:outline-none"
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="rounded-full ml-2 mt-2 pt-2 pb-1">
              <IoFunnel />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>By Expiry</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleFilter('closest')}>Closest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter('farthest')}>Farthest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="bg-gray-2">
          {/* <> TODO </> */}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filteredCells.map((thisProduct, index) => (
          <StockCard key={index} {...thisProduct} />
        ))}
      </div>
    </div>
  )
}

export default Page