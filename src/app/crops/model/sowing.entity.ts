import { PhenologicalPhase } from './phenological-phase';
export { PhenologicalPhase } from './phenological-phase';

export class DateRange {
  startDate: string;
  endDate: string;

  constructor() {
    this.startDate = "";
    this.endDate = "";
  }
}

export class Sowing {
  id: number;
  dateRange: DateRange;
  profileId: number;
  areaLand: number;
  status: boolean;
  cropId: number;
  phenologicalPhase: PhenologicalPhase;

  constructor() {
    this.id = 0;
    this.dateRange = new DateRange();
    this.profileId = 0;
    this.areaLand = 0;
    this.status = false;
    this.cropId = 0;
    this.phenologicalPhase = PhenologicalPhase.GERMINATION;
  }
}
