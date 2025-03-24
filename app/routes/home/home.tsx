import { useState } from "react";
import { TableHead } from "~/routes/home/components/tableHead";
import type { Route } from "../home/+types/home";
import { TableItem } from "./components/tableItem";
import { useConversionRates } from "./hooks/useConversionRates";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Puffer" },
    { name: "description", content: "Welcome to Puffer App!" },
  ];
}

export default function Home() {
  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('day');
  const [paginationPage, setPaginationPage] = useState<number>(1);

  const { data: conversionRates, isLoading, error } = useConversionRates({ filter, paginationPage });

  const handleFilterChange = (newFilter: 'day' | 'week' | 'month') => {
    setFilter(newFilter);
    setPaginationPage(1);
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
      {/* Add filter buttons */}
      <div className="mb-4 flex gap-2 justify-end">
        <button
          onClick={() => handleFilterChange("day")}
          className={`px-4 py-2 rounded ${
            filter === "day" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => handleFilterChange("week")}
          className={`px-4 py-2 rounded ${
            filter === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => handleFilterChange("month")}
          className={`px-4 py-2 rounded ${
            filter === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Month
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHead headItems={["ID", "Created", "Eth Amount", "Amount"]} />
          <tbody className="bg-white divide-y divide-gray-200">
            {conversionRates?.data?.map((transaction: any) => (
              <TableItem item={transaction} key={transaction.id} />
            ))}
          </tbody>
        </table>
        <></>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setPaginationPage((prev) => Math.max(1, prev - 1))}
          disabled={paginationPage === 1}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {paginationPage}</span>
        <button
          onClick={() => setPaginationPage((prev) => prev + 1)}
          disabled={!conversionRates?.data?.length}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
