import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-most-registered-crop-dialog',
  templateUrl: './most-registered-crop-dialog.component.html',
  styleUrls: ['./most-registered-crop-dialog.component.css']
})
export class MostRegisteredCropDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { crop: string }) { }
}
