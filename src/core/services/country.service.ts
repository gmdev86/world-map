import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  private worldBankBaseUrl = 'https://api.worldbank.org/v2/country';
  private cachedData: any;

  async getCountryData(countryCode: string) {
    const apiUrl = `${this.worldBankBaseUrl}/${countryCode}?format=json`;

    this.cachedData = await this.http.get(apiUrl).toPromise();
    return this.cachedData[1][0].name;
  }

  getAdditionalCountryData(countryName: string) {
    return this.cachedData;
  }
}
