import { useState } from "react";
import type { Route } from "../home/+types/home";
import { useCurrentRate } from "./hooks/useCurrentRate";
import { intlDateTimeFormat } from "~/utils/intlDateTimeFormat";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Puffer" },
    { name: "description", content: "Welcome to Puffer App!" },
  ];
}

export default function CurrentRatePage() {
  const [pufethAmount, setPufethAmount] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("");
  const [isReversed, setIsReversed] = useState(false);

  const { data: currentRate, error, isLoading, refetch } = useCurrentRate();

  const handlePufethChange = (value: string) => {
    setPufethAmount(value);
    if (currentRate && value) {
      const result = parseFloat(value) * currentRate.ethAmount;
      setEthAmount(result.toFixed(6));
    } else {
      setEthAmount("");
    }
  };

  const handleEthChange = (value: string) => {
    setEthAmount(value);
    if (currentRate && value) {
      const result = parseFloat(value) / currentRate.ethAmount;
      setPufethAmount(result.toFixed(6));
    } else {
      setPufethAmount("");
    }
  };

  const handleSwitch = () => {
    setIsReversed(!isReversed);
    const tempPuf = pufethAmount;
    setPufethAmount(ethAmount);
    setEthAmount(tempPuf);
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Current Rate</h2>
          <button
            onClick={() => refetch()}
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isReversed ? "ETH Amount" : "pufETH Amount"}
              </label>
              <input
                type="number"
                value={isReversed ? ethAmount : pufethAmount}
                onChange={(e) =>
                  isReversed
                    ? handleEthChange(e.target.value)
                    : handlePufethChange(e.target.value)
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>

            <button
              onClick={handleSwitch}
              className="p-2 rounded-full hover:bg-gray-100 transform transition-transform duration-200 hover:scale-110"
            >
              <svg
                className="w-6 h-6 md:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isReversed ? "pufETH Amount" : "ETH Amount"}
              </label>
              <input
                type="number"
                value={isReversed ? pufethAmount : ethAmount}
                onChange={(e) =>
                  isReversed
                    ? handlePufethChange(e.target.value)
                    : handleEthChange(e.target.value)
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="text-sm text-gray-500 flex justify-between items-center border-t pt-4">
            <span>
              Last update:{" "}
              {currentRate?.createdAt
                ? intlDateTimeFormat(currentRate.createdAt)
                : "N/A"}
            </span>
            <span>1 pufETH = {currentRate?.ethAmount.toFixed(6)} ETH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
