'use client';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateResponse } from '@/lib/gemini';
import { supabase } from '@/lib/SupabaseClient';
import { Product } from '@/public/types';
import React, { useState } from 'react';

const Page = () => {
  const [value, setValue] = useState<string>('0');
  const [plan, setPlan] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    console.log('Input Value:', inputValue); // Debugging: Log the input value
    setValue(inputValue);
  };

  function sanitizeInput(itemData: Product) {
    return `Name: ${itemData.item_name}, Expiry Date: ${itemData.expiry_date}, Cost: ${itemData.price}`;
  }

  async function firePrompt() {
    let prompt =
      'Create a plan, without using tables, mentioning the best date and the medicines and their respective amounts (in indian rupees) such that the budget is not exceeded and most amount of medicines at risk of expiring are covered for. If nothing is covered by the budget, return an impossibility. If there is more than 6 months of time between the time now and before the next restock for an item, return a safety message for that item saying that that specific at stock is optimal. Below is the given data.';
    prompt += `\nAvailable Budget: ${value}`;

    console.log(value);

    console.log(prompt, 'PROMPT A');

    const { data: cartData, error: cartError } = await supabase
      .from('Owned')
      .select('*');

    if (cartError) {
      console.error(cartError);
      return;
    }

    if (cartData.length === 0) {
      console.log('Got Null Product IDs');
      return;
    }

    const cartIds = cartData.map((item) => item.product_id);

    const { data: marketData, error: marketError } = await supabase
      .from('Market')
      .select('*')
      .in('id', cartIds);

    if (marketError) {
      console.error(marketError);
      return;
    }

    const combinedData = marketData.map((product) => {
      const cartItem = cartData.find((item) => item.product_id === product.id);
      return {
        ...product,
        buy_time: cartItem ? new Date(cartItem.buy_time) : undefined,
      };
    });

    combinedData.forEach((thisProduct, _) => {
      prompt += sanitizeInput(thisProduct);
    });

    console.log(prompt, 'PROMPT B');

    console.log(combinedData);

    if (combinedData.length == 0) {
      return;
    }

    let response = await generateResponse(prompt);
    response = response.replace(/[*#]/g, '');
    setPlan(response);

    console.log(response);
  }

  return (
    <ScrollArea className="p-4 mb-5">
      <div className="flex mb-10 pl-2 underline text-4xl">
        दव<p className="font-bold">AI</p>
        <Logo/>
      </div>
      <div className = 'text-xl font-bold'>
        Restock Advisor
      </div>
      <div className="mb-4">
        <label htmlFor="integer-input" className="block mb-2">
          What's Your Budget for Restocking?
        </label>
        <Input
          id="integer-input"
          type="number"
          placeholder="In Rupees"
          value={value}
          onChange={handleInputChange}
          className="w-64 border border-1 border-gray-2"
        />
      </div>

      <Button onClick={firePrompt}>
        Plan Next Orders
      </Button>

      <div className="mt-4">
        <div className="mt-2 p-4 border rounded-md bg-gray-50 max-w-[600px] overflow-x-hidden overflow-y-auto break-words whitespace-pre-wrap">
          <pre className="whitespace-pre-wrap font-sans">{plan}</pre>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Page;