import { useQuery } from "@tanstack/react-query";
import { conversionRateApiService } from "../services/getTransactionData";

export const useConversionRates = ({filter, paginationPage}: {filter: string, paginationPage: number}) => {
  return useQuery({
    queryKey: ["transactions", filter, paginationPage],
    queryFn: conversionRateApiService.getConversionRates,
  });
};
