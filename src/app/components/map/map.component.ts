import { Component, Output, EventEmitter } from '@angular/core';
import { CountryService } from 'src/core/services/country.service';
import { CountryInfo } from 'src/core/models/country-info.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  constructor(private countryService: CountryService) {}

  private countryInfoModel: CountryInfo = {
    countryId: '',
    countryName: '',
    capitalCity: '',
    incomeLevel: '',
    latitude: '',
    longitude: '',
    region: ''
  };

  @Output()
  onPopulateCountryForm = new EventEmitter<CountryInfo>();

  async onPathClicked(e: any){
    let countryName = await this.countryService.getCountryData(e.srcElement.id);
    let additionalData = this.countryService.getAdditionalCountryData(countryName);
    const resp = additionalData[1][0];
        this.countryInfoModel.countryId = resp.id;
        this.countryInfoModel.countryName = resp.name;
        this.countryInfoModel.capitalCity = resp.capitalCity;
        this.countryInfoModel.incomeLevel = resp.incomeLevel.value;
        this.countryInfoModel.latitude = resp.latitude;
        this.countryInfoModel.longitude = resp.longitude;
        this.countryInfoModel.region = resp.region.value;
      if(this.onPopulateCountryForm){
        this.onPopulateCountryForm.emit(this.countryInfoModel);
      }
  }

  onMouseOver(e: any){
    let hoveredPath = e.target as HTMLElement;
    if(hoveredPath){
      hoveredPath.style.fill = 'lightblue';
      hoveredPath.style.stroke = 'red';
      hoveredPath.style.strokeWidth  = '1';
      hoveredPath.style.filter = 'drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.8))';
      hoveredPath.style.cursor = 'pointer';
    }
  }

  onMouseLeave(e: any){
    let hoveredPath = e.target as HTMLElement;
    console.log(e);
    if(hoveredPath){
      hoveredPath.style.fill = '';
      hoveredPath.style.stroke = '';
      hoveredPath.style.strokeWidth  = '1';
      hoveredPath.style.filter = 'none';
      hoveredPath.style.cursor = 'auto';
    }
  }
}
