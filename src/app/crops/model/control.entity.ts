export class Control {
  id: number;
  sowingId: number;
  controlDate: string;
  sowingCondition: string;
  sowingSoilMoisture: string;
  sowingStemCondition: string;

  constructor() {
    this.id = 0;
    this.sowingId = 0;
    this.controlDate = "";
    this.sowingCondition = "";
    this.sowingSoilMoisture = "";
    this.sowingStemCondition = "";
  }
}
