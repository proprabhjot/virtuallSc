import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from 'src/app/Service/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items;

  //items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  constructor(private apiService: ApiServiceService) {
  }

  ngOnInit() {
    this.apiService.getToken().subscribe(response => {
      this.apiService.getAccessoryData(this.apiService.token).subscribe(data => {
        this.items = data.products;
        console.log(this.items);
        });
    });
  }

}
