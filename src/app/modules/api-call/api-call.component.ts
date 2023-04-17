import { Component, OnInit } from '@angular/core';
import { ApiService, Price } from '../../shared/services/api.service';

@Component({
  selector: 'app-api-call',
  templateUrl: './api-call.component.html',
  styleUrls: ['./api-call.component.css'],
})
export class ApiCallComponent implements OnInit {
  loading = false;

  chartName = '';
  time = '';
  disclaimer = '';
  prices: Price[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPrice();
  }

  getPrice() {
    this.loading = true;
    this.apiService.getPrice().subscribe(
      (res) => {
        this.chartName = res.chartName;
        this.time = res.time.updatedISO;
        this.disclaimer = res.disclaimer;
        this.prices = Object.values(res.bpi);
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      },
    );
  }
}
