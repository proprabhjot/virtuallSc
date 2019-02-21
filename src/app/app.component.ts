import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from 'src/app/Service/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: any[];
  image: string;

  constructor(private apiService: ApiServiceService) {
  }

  getImage(path: any) {
    const env = 'https://www.t-mobile.com';
    if (path && path.skus[0] && path.skus[0].images[0] && path.skus[0].images[0].url) {
      this.image = env + path.skus[0].images[0].url;
    }
    return this.image || '';
  }

  ngOnInit() {
    this.apiService.getToken().subscribe(response => {
      this.apiService.getAccessoryData(this.apiService.token).subscribe((data: { products: any[] }) => {
        this.items = data.products;
        console.log(this.items);
      });
    });
  }

}
