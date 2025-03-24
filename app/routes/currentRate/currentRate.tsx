import { useState } from "react";
import type { Route } from "../home/+types/home";
import { useCurrentRate } from "./hooks/useCurrentRate";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Puffer" },
    { name: "description", content: "Welcome to Puffer App!" },
  ];
}

export default function CurrentRatePage() {
  const { data: currentRate, error, isLoading } = useCurrentRate();
  const [inputAmount, setInputAmount] = useState<string>('');
  const [isEthToPuf, setIsEthToPuf] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl">
        Error loading data
      </div>
    );
  }

  const calculateRate = () => {
    if (!inputAmount || !currentRate) return 0;
    const amount = parseFloat(inputAmount);
    
    if (isEthToPuf) {
      return amount / currentRate.ethAmount;
    } else {
      return amount * currentRate.ethAmount;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Current Rate</h2>
        <div className="grid gap-4 mb-8">
          <div className="border-b pb-2">
            <span className="font-semibold">1 pufETH = </span>
            <span>{currentRate?.ethAmount} ETH</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Calculator</h3>
          
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setIsEthToPuf(!isEthToPuf)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isEthToPuf ? 'ETH → pufETH' : 'pufETH → ETH'}
            </button>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEthToPuf ? 'ETH Amount' : 'pufETH Amount'}
              </label>
              <input
                type="number"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>

            <div className="border-t pt-4">
              <div className="text-lg">
                <span className="font-semibold">Result: </span>
                <span>
                  {inputAmount ? calculateRate().toFixed(6) : '0'} {isEthToPuf ? 'pufETH' : 'ETH'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
