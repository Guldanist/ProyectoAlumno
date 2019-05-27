import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  private intervalUpdate: any = null;
  public chart: any = null;

  constructor(private http: HttpClient) {
    this.getFromAPI().subscribe(response => {
      if (response.error === false) {
        let chartTime: any = new Date();
        chartTime = chartTime.getHours() + ':'
          + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() :
            chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0'
              + chartTime.getSeconds() : chartTime.getSeconds());
        if (this.chart.data.labels.length > 15) {
          this.chart.data.labels.shift();
          this.chart.data.datasets[0].data.shift();
        }
        this.chart.data.labels.push(chartTime);
        this.chart.data.datasets[0].data.push(response.data);
        this.chart.update();
      } else {
        console.error('ERROR: The response had an error, retrying');
      }
    }, error => {
      console.error('ERROR: Unexpected response');
    });
  }
}




