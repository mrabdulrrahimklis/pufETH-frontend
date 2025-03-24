import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { intlDateTimeFormat } from "~/utils/intlDateTimeFormat";
import { useConversionRates } from "../home/hooks/useConversionRates";
import type { ITransaction } from "../home/types/transaction";

function GraphPage() {
  const [filter, setFilter] = useState<"day" | "week" | "month">("day");
  const [paginationPage, setPaginationPage] = useState<number>(1);

  const { data: conversionRates, isLoading, error } = useConversionRates({
    filter,
    paginationPage,
  });

  const getTrend = () => {
    if (!conversionRates?.data || conversionRates.data.length < 2) return 'neutral';
    const lastTwo = conversionRates.data.slice(-2);
    return lastTwo[1].ethAmount > lastTwo[0].ethAmount ? 'up' : 'down';
  };

  const getCurrentRate = () => {
    if (!conversionRates?.data || conversionRates.data.length === 0) return null;
    return conversionRates.data[conversionRates.data.length - 1].ethAmount;
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
      <div className="flex gap-6">
        {/* Left section - 70% */}
        <div className="w-[70%] bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold">pufETH Conversion Rate Timeline</h2>
          <p className="text-gray-600 mb-6">
            pufETH to ETH conversion rate over the last few hours
          </p>
          <div style={{ height: "600px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={conversionRates?.data?.map((item: ITransaction) => ({
                  name: intlDateTimeFormat(item.createdAt, true),
                  uv: item.ethAmount,
                  pv: item.amount,
                }))}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis axisLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right section - 30% */}
        <div className="w-[30%] space-y-6">
          {/* Current Rate Box */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">Conversion Rate</h3>
            <p className="text-gray-600 text-sm mb-4">
              Current pufETH to ETH conversion rate
            </p>
            <div className="text-3xl font-bold text-blue-600">
              {getCurrentRate()?.toFixed(6)} ETH
            </div>
          </div>

          {/* Trend Box */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">Conversion Rate Trend</h3>
            <p className="text-gray-600 text-sm mb-4">
              According to last two points in timeline
            </p>
            <div className="flex justify-center">
              {getTrend() === 'up' && (
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              )}
              {getTrend() === 'down' && (
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              )}
              {getTrend() === 'neutral' && (
                <svg
                  className="w-16 h-16 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphPage;