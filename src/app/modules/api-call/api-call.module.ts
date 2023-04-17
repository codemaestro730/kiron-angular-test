import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiCallComponent } from './api-call.component';
import { ApiCallRoutingModule } from './api-call-routing.module';

@NgModule({
  declarations: [ApiCallComponent],
  imports: [CommonModule, ApiCallRoutingModule],
})
export class ApiCallModule {}
