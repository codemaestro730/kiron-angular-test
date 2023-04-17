import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Price {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

interface PriceAPIReturn {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  chartName: string;
  bpi: {
    [key: string]: Price;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getPrice() {
    return this.httpClient.get<PriceAPIReturn>('https://api.coindesk.com/v1/bpi/currentprice.json');
  }
}
