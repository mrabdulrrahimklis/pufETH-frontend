import { useQuery } from "@tanstack/react-query";
import { conversionRateApiService } from "../services/getConversionRate";

export const useCurrentRate = () => {
  return useQuery({
    queryKey: ["euroEquivalent"],
    queryFn: conversionRateApiService.getCurrentRate,
  });
};
