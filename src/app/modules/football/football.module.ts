import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballComponent } from './football.component';
import { FootballRoutingModule } from './football-routing.module';

@NgModule({
  declarations: [FootballComponent],
  imports: [CommonModule, FootballRoutingModule],
})
export class FootballModule {}
