import { BehaviorSubject } from 'rxjs';

export interface SportConfig {
  msPerGamePeriod: number;
  break: number;
}

interface GoalInfo {
  teamAbbr: string;
  teamID: number;
  videoMS: number;
}

export interface Fixture {
  homeTeamAbbr: string;
  homeTeamID: number;
  awayTeamAbbr: string;
  awayTeamID: number;
  goals: GoalInfo[];
}

interface Team {
  id: number;
  abbr: string;
  score: number;
}

export class SportModel {
  realMsPerGamePeriod: number;
  realBreak: number;
  msPerGamePeriod: number;
  break: number;
  homeTeam: Team;
  awayTeam: Team;
  goals: GoalInfo[];
  currentTime: number;
  gameCount = 1;
  intervalId: number | null = null;
  startedTime = 0;

  private _playing = new BehaviorSubject(false);
  $playing = this._playing.asObservable();

  get playing() {
    return this._playing.value;
  }

  constructor(config: SportConfig, fixture: Fixture) {
    this.msPerGamePeriod = config.msPerGamePeriod;
    this.break = config.break;
    this.realMsPerGamePeriod = config.msPerGamePeriod;
    this.realBreak = config.break;

    this.homeTeam = {
      id: fixture.homeTeamID,
      abbr: fixture.homeTeamAbbr,
      score: 0,
    };
    this.awayTeam = {
      id: fixture.awayTeamID,
      abbr: fixture.awayTeamAbbr,
      score: 0,
    };
    this.goals = fixture.goals;
    this.currentTime = 0;
  }

  initMatch() {
    this._playing.next(false);
    this.currentTime = 0;
    this.startedTime = new Date().getTime();
    this.homeTeam.score = 0;
    this.awayTeam.score = 0;
  }

  startMatch() {
    this.initMatch();

    this.goals.forEach((goalInfo) => {
      const scoreTime = this.getScoreTime(goalInfo.videoMS);

      setTimeout(() => {
        if (goalInfo.teamID === this.homeTeam.id) {
          this.homeTeam.score += 1;
        } else if (goalInfo.teamID === this.awayTeam.id) {
          this.awayTeam.score += 1;
        }
      }, scoreTime);
    });

    this._playing.next(true);
    this.intervalId = setInterval(() => {
      this.currentTime = new Date().getTime() - this.startedTime;

      if (this.currentTime >= this.totalTime && this.intervalId) {
        clearInterval(this.intervalId);
        this._playing.next(false);
      }
    }, 100);
  }

  getScoreTime(time: number) {
    let periodNumber = Math.floor(time / this.msPerGamePeriod);
    if (periodNumber >= this.gameCount) {
      periodNumber = this.gameCount - 1;
    }
    return time + periodNumber * this.break;
  }

  formatNumber(value: number) {
    return value < 10 ? '0' + value : `${value}`;
  }

  getTime(milliseconds: number) {
    const matchTimescale = this.realMsPerGamePeriod / this.msPerGamePeriod;

    const minutes = Math.floor((milliseconds * matchTimescale) / 1000 / 60);
    const seconds = Math.floor((milliseconds * matchTimescale) / 1000) % 60;

    return `${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;
  }

  getBreakTime(milliseconds: number) {
    const breakTimescale = this.realBreak / this.break;

    const minutes = Math.floor((milliseconds * breakTimescale) / 1000 / 60);
    const seconds = Math.floor((milliseconds * breakTimescale) / 1000) % 60;

    return `${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;
  }

  formatGameNumber(value: number) {
    let prefix = 'th';
    switch (value % 10) {
      case 1:
        prefix = 'st';
        break;
      case 2:
        prefix = 'nd';
        break;
      case 3:
        prefix = 'rd';
        break;
      default:
        break;
    }

    return `${value}${prefix}`;
  }

  get totalTime() {
    let totalTime = this.msPerGamePeriod * this.gameCount + this.break * (this.gameCount - 1);

    if (this.goals.length > 0) {
      const lastGoal = this.goals[this.goals.length - 1];

      if (lastGoal.videoMS > this.msPerGamePeriod * this.gameCount) {
        totalTime = totalTime + lastGoal.videoMS - this.msPerGamePeriod * this.gameCount;
      }
    }

    return totalTime;
  }

  get matchInformation() {
    let time;
    let status;

    const period = this.msPerGamePeriod + this.break;
    const periodNumber = Math.floor(this.currentTime / period);

    if (periodNumber < this.gameCount) {
      if (this.currentTime - period * periodNumber >= this.msPerGamePeriod) {
        time = this.msPerGamePeriod * (1 + periodNumber);
        const breakTime = this.currentTime - period * periodNumber - this.msPerGamePeriod;

        if (periodNumber === this.gameCount - 1) {
          status = `Extra: ${this.getTime(breakTime)}`;
        } else {
          status = `Break: ${this.getBreakTime(breakTime)}`;
        }
      } else {
        time = this.currentTime - this.break * periodNumber;
        status = `${this.formatGameNumber(periodNumber + 1)} match`;
      }
    } else {
      time = this.msPerGamePeriod * this.gameCount;
      const extraTime = this.currentTime - period * this.gameCount + this.break;
      status = `Extra: ${this.getTime(extraTime)}`;
    }

    if (this.currentTime === 0) {
      status = '';
    }

    if (this.currentTime >= this.totalTime) {
      status = 'Finished';
    }

    return {
      time: `${this.getTime(time)}`,
      status,
    };
  }
}
