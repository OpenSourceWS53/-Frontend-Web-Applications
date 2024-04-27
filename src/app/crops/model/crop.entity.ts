export class Crop {
  id: number;
  name: string;
  plantedDate: string;
  harvestDate: string;
  phenologicalPhase: string;
  plantedArea: number;
  description: string;
  constructor() {
    this.id = 0;
    this.name = "";
    this.plantedDate = "";
    this.harvestDate = "";
    this.phenologicalPhase = "";
    this.plantedArea = 0;
    this.description = "";
  }
}
