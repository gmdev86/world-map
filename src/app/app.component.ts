import { Component } from '@angular/core';
import { CountryInfo } from 'src/core/models/country-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'world-map';
  countryInfo: any;

  constructor(){
    this.countryInfo = {};
  }

  onPopulateCountryForm(newCountryInfo: CountryInfo){
    this.countryInfo = newCountryInfo;
  }
}
