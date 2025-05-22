import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { ShopPackage } from "../models/shopPackage";
import {PaymentLinkCreationOptionsModel} from "../models/PaymentLinkCreationOptions";
import {UrlModel} from "../models/UrlModel";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShopPackageService {

  public packages: ShopPackage[] = [];
  private placeholderPackages: ShopPackage[] = [];


  private apiUrl: string = environment.backendApiUrl + "product";

  constructor(private http: HttpClient) {
    this.getPackages().subscribe({next: (data: ShopPackage[]) => {
        this.packages = data.sort((a, b) => a.priceAmount - b.priceAmount);
        if (this.packages.length === 0) {
          this.packages = this.placeholderPackages.sort((a, b) => a.priceAmount - b.priceAmount)
        }
      }, error: (err) => {
        this.packages = this.placeholderPackages.sort((a, b) => a.priceAmount - b.priceAmount);
      }})
  }

  private getPackages() {
    return this.http.get<ShopPackage[]>(`${this.apiUrl}`);
  }

  public getPaymentLink(productId: string, options: PaymentLinkCreationOptionsModel) {
    return this.http.post<UrlModel>(`${this.apiUrl}/${productId}`, options);
  }
}
