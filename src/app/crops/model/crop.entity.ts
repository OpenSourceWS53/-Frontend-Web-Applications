export class Crop {
  name: string;
  description: string;
  diseases: number[];
  pests: number[];

  constructor() {
    this.name = "";
    this.description = "";
    this.diseases = [];
    this.pests = [];
  }
}
