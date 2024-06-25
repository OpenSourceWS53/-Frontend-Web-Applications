import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component, OnInit, ViewChild } from "@angular/core";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartComponent, ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";
import { MatCardModule } from '@angular/material/card';
import { SowingsService } from "../../services/sowings.service";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { CropsService } from "../../services/crops.service";

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
  @ViewChild('registeredCropDialog') registeredCropDialog!: TemplateRef<any>;
  @ViewChild('controlledCropDialog') controlledCropDialog!: TemplateRef<any>;
  public chartOptions: Partial<ChartOptions>;
  public controlChartOptions: Partial<ChartOptions>;
  public mostRegisteredCrop: string = '';
  public mostControlledCrop: string = '';

constructor(
  private sowingsService: SowingsService,
  private cropsService: CropsService,
  public dialog: MatDialog
) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 500,
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

    this.controlChartOptions = {
      series: [],
      chart: {
        width: 500,
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

  private countItems(items: any[]): { [key: string]: number } {
    return items.reduce((acc: { [key: string]: number }, item: any) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  }

  private getMaxItem(counts: { [key: string]: number }): string {
    let maxCount = Math.max(...Object.values(counts));
    return Object.keys(counts).find(key => counts[key] === maxCount) || '';
  }

  ngOnInit() {
    const cropNames: { [key: string]: string } = {};

    this.cropsService.getAll().subscribe((crops: any[]) => {
      crops.forEach(crop => {
        cropNames[crop.id] = crop.name;
      });
    });

    this.sowingsService.getAll().subscribe((sowings: any[]) => {
      if (sowings) {
        const cropCounts = this.countItems(sowings.map((sowing: any) => sowing.cropId));

        this.sowingsService.getAllControls().subscribe((controls: any[]) => {
          if (controls) {
            const controlCropCounts: { [key: string]: number } = {};

            controls.forEach((control: any) => {
              const sowing = sowings.find((sowing: any) => sowing.id === control.sowingId);
              if (sowing) {
                controlCropCounts[sowing.cropId] = (controlCropCounts[sowing.cropId] || 0) + 1;
              }
            });

            for (const cropId in controlCropCounts) {
              console.log(`Crop ${cropNames[cropId]} (${cropId}) has ${controlCropCounts[cropId]} controls.`);
            }

            this.chartOptions.series = Object.values(cropCounts);
            this.chartOptions.labels = Object.keys(cropCounts).map(id => cropNames[id]);
            this.controlChartOptions.series = Object.values(controlCropCounts);
            this.controlChartOptions.labels = Object.keys(controlCropCounts).map(id => cropNames[id]);

            const mostRegisteredCropId = this.getMaxItem(cropCounts);
            this.cropsService.getById(mostRegisteredCropId).subscribe((crop: any) => {
              this.mostRegisteredCrop = crop.name;
            });

            const mostControlledCropId = this.getMaxItem(controlCropCounts);
            this.cropsService.getById(mostControlledCropId).subscribe((crop: any) => {
              this.mostControlledCrop = crop.name;
            });
          }
        });
      }
    });
  }
  openDialog(): void {
    this.dialog.open(this.registeredCropDialog, {
      data: {
        crop: this.mostRegisteredCrop
      }
    });
  }

  openControlledCropDialog(): void {
    this.dialog.open(this.controlledCropDialog, {
      data: {
        crop: this.mostControlledCrop
      }
    });
  }
}

@NgModule({
  declarations: [CropsStatisticsComponent],
  imports: [BrowserModule, NgApexchartsModule, MatCardModule,MatDialogModule],
  providers: [SowingsService],
  bootstrap: [CropsStatisticsComponent]
})
export class AppModule { }
