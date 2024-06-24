export class Crop {
  id: number;
  name: string;
  description: string;
  diseases: number[];
  pests: number[];
  cares: number[];
  imageUrl: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.diseases = [];
    this.pests = [];
    this.cares = [];
        this.imageUrl = ""
  }
}
