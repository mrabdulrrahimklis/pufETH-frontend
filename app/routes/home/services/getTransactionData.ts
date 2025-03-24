import { apiService } from "~/services/apiService";

export interface IConversionRateProps {
  name: string
  filter: string;
  paginationPage: number;
}

class ConversionRateApiService {
  async getConversionRates(conversionRateProps: any): Promise<any> {
    const [_, filter, paginationPage] = conversionRateProps.queryKey;
    const transactionsResponse: any = apiService.responseHandler(
      await apiService.get<any>(`/conversion-rate/history?period=${filter}&page=${paginationPage}`)
    );

    return transactionsResponse;
  }

  async getCurrentRate(): Promise<any> {
    const eurEquivalentResponse: any = apiService.responseHandler(
      await apiService.get<any>("/conversion-rate/current")
    );

    return eurEquivalentResponse;
  }
}

export const conversionRateApiService = new ConversionRateApiService();
