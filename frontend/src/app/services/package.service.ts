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
  private placeholderPackages: Package[] = [{name: 'test', amount: 100, priceAmount: 16999, isRecommended: "true", priceId: "1", productId: "1", currency: 'EUR'},
    {name: 'test2', amount: 500, priceAmount: 16999, isRecommended: "false", priceId: "1", productId: "2", currency: 'EUR'},
    {name: 'test3', amount: 1000, priceAmount: 16999, isRecommended: "false", priceId: "1", productId: "3", currency: 'EUR'},
    {name: 'test4', amount: 10000, priceAmount: 16999, isRecommended: "false", priceId: "1", productId: "4", currency: 'EUR'},
    {name: 'test5', amount: 25000, priceAmount: 16999, isRecommended: "true", priceId: "1", productId: "5", currency: 'EUR'},
    {name: 'test6', amount: 50000, priceAmount: 16999, isRecommended: "false", priceId: "1", productId: "6", currency: 'EUR'}];


  private apiUrl: string = "http://localhost:8080/api/product";

  private headers: HttpHeaders = new HttpHeaders({
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxX3I2eDlta1B3cm9NWHQ5Q1Y4cktyak5WNndybktrWnI0Qk5xYW9QM2VVIn0.eyJleHAiOjE3NDM1OTgyMDYsImlhdCI6MTc0MzU5NzkwNiwianRpIjoiNmEyYjU3MWUtMWY1My00OTI2LTkwZWMtZTUxOGMxYmQzNzI2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDkwL3JlYWxtcy9MRjEyIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjUyY2MwMjA4LWEzYmQtNDM2Ny05NGM1LTA0MDRiMDE2YTAwMyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImxmMTIiLCJzZXNzaW9uX3N0YXRlIjoiZTM4YmQzYjQtOWEwMi00NDU0LWI4ZmMtNzcxMmVlNDFlOTQ5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjQyMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbGYxMiIsImxmMTJfdGVzdF9yb2xlIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImUzOGJkM2I0LTlhMDItNDQ1NC1iOGZjLTc3MTJlZTQxZTk0OSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoibGYxMl90ZXN0X3VzZXIifQ.twDFx-n11QAPtNS3G6txvE9x7L1fBv5847edd0UXOZeCa9_SaxUeYw6NwS6w5SpEkwjscfX3bBkvj08-pOZQa8O1ALFYRhI9sHEIu72MX5WXzA1MQtcMI6veBy3PVjetRTCWcvSwGwRNIEYamcj7IF4tY5IpFlQCToDdk4yuDttkyWFdyPcG-8TtnwvR_0FEGCQ9QcfKpmN5nnmo9-apviqz-IKxE-fU49RA_qXM11qa-HcGfCsNkDathqAcMlhVkYGgQXGjIVW729k02txI2GugIsOg3u1Ne0UBsqRedg1i5eB-2mA2o-nroTTBNbyTBuhbdVulqxqy2HWbbdJ8Ew"
  });

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
    return this.http.get<Package[]>(`${this.apiUrl}`, {headers: this.headers});
  }

  public  getPaymentLink(productId: string, options: PaymentLinkCreationOptionsModel) {
    return this.http.post<UrlModel>(`${this.apiUrl}/${productId}`, options, {headers: this.headers});
  }
}
