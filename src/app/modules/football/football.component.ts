import { Component, OnInit } from '@angular/core';
import playout from './data/football-playout.json';
import { FootballModel } from '../../shared/models/football.model';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css'],
})
export class FootballComponent implements OnInit {
  matches: FootballModel[] = [];
  playing = false;

  constructor() {}

  ngOnInit(): void {
    this.matches = playout.data.map((item) => {
      const match = new FootballModel(playout.config, item);
      match.$playing.subscribe((isPlaying) => {
        if (isPlaying) {
          this.playing = true;
        } else {
          this.checkMatchPlaying();
        }
      });
      return match;
    });
  }

  checkMatchPlaying() {
    this.playing = this.matches.some((item) => item.playing);
  }

  matchStart() {
    this.matches.forEach((match) => {
      match.startMatch();
    });
  }
}
