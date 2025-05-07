import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Package } from "../models/package";
import {PaymentLinkCreationOptionsModel} from "../models/PaymentLinkCreationOptions";
import {UrlModel} from "../models/UrlModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  public packages: Package[] = [];
  private placeholderPackages: Package[] = [];


  private apiUrl: string = "http://localhost:8080/api/product";

  constructor(private http: HttpClient) {
    this.getPackages().subscribe({next: (data: Package[]) => {
        this.packages = data.sort((a, b) => a.priceAmount - b.priceAmount);
        if (this.packages.length === 0) {
          this.packages = this.placeholderPackages.sort((a, b) => a.priceAmount - b.priceAmount)
        }
      }, error: (err) => {
        this.packages = this.placeholderPackages.sort((a, b) => a.priceAmount - b.priceAmount);
      }})
  }

  private getPackages() {
    return this.http.get<Package[]>(`${this.apiUrl}`);
  }

  public  getPaymentLink(productId: string, options: PaymentLinkCreationOptionsModel) {
    return this.http.post<UrlModel>(`${this.apiUrl}/${productId}`, options);
  }
}
