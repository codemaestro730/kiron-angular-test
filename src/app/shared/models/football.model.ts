import { Fixture, SportConfig, SportModel } from './sport.model';

export class FootballModel extends SportModel {
  constructor(config: SportConfig, fixture: Fixture) {
    super(config, fixture);

    this.realBreak = 15 * 60 * 1000;
    this.realMsPerGamePeriod = 45 * 60 * 1000;
    this.gameCount = 2;
  }
}
