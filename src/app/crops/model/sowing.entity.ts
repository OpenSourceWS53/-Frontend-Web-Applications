import { Control } from './control.entity';

export class Sowing {
  id: number;
  start_date: string;
  harvest_date: string;
  area_land: number;
  userId: number;
  cropId: number;
  crop_name: string;
  phenological_phase: string;
  description: string;
  crop_info: any;
  controls: Control[];

  constructor() {
    this.id = 0;
    this.start_date = "";
    this.harvest_date = "";
    this.area_land = 0;
    this.userId = 0;
    this.cropId = 0;
    this.crop_name="";
    this.phenological_phase = "";
    this.description = "";
    this.crop_info = {};
    this.controls = [];
  }
}
