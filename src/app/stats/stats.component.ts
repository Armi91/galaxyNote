import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  scannedDesign;
  scannedEfficiency;
  scannedCamera;
  scannedDoodle;
  scannedPrize;
  all;

  constructor(private stats: StatsService) { }

  ngOnInit() {
    // this.stats.getAll().subscribe(data => {
    //   console.log(JSON.stringify(data));
    // });

    this.count();
  }

  count = () => {
    this.stats.getAll().subscribe(data => {
      this.scannedPrize = data.filter((el: any) => {
        return el.scanned.prize;
      }).length;

      this.all = data.length;

      this.scannedDesign = data.filter((el: any) => {
        return el.scanned.design;
      }).length;

      this.scannedEfficiency = data.filter((el: any) => {
        return el.scanned.efficiency;
      }).length;

      this.scannedCamera = data.filter((el: any) => {
        return el.scanned.camera;
      }).length;

      this.scannedDoodle = data.filter((el: any) => {
        return el.scanned.spen;
      }).length;
    });
  }

}
