export class Control {
  "cropId": number;
  "date": Date;
  "leave": string;
  "stem": string;
  "soil": string;
  "id": number;
  constructor() {
    this.cropId = 0;
    this.date = new Date();
    this.leave = "";
    this.stem = "";
    this.soil = "";
    this.id = 0;
  }
}
