import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component, OnInit, ViewChild } from "@angular/core";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartComponent, ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";
import { MatCardModule } from '@angular/material/card';
import {CropsService} from "../../services/crops.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-crops-statistics',
  templateUrl: './crops-statistics.component.html',
  styleUrls: ['./crops-statistics.component.css']
})
export class CropsStatisticsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private cropService: CropsService) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 600,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  private getAllCrops() {
    this.cropService.getAll().subscribe((response: any) => {
      const counts = response.reduce((acc: { [key: string]: number }, crop: any) => {
        acc[crop.name] = (acc[crop.name] || 0) + 1;
        return acc;
      }, {});
      this.chartOptions.labels = Object.keys(counts);
      this.chartOptions.series = Object.values(counts);
    });
  };

  ngOnInit() {
    this.getAllCrops();
  }
}

@NgModule({
  declarations: [CropsStatisticsComponent],
  imports: [BrowserModule, NgApexchartsModule, MatCardModule],
  providers: [CropsService],
  bootstrap: [CropsStatisticsComponent]
})
export class AppModule { }
