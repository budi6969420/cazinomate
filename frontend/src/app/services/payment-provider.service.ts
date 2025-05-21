import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PaymentProvider} from "../models/paymentProvider";

@Injectable({
  providedIn: 'root'
})
export class PaymentProviderService {

  private apiUrl = 'http://localhost:8080/api/paymentProvider';

  public paymentProviders: PaymentProvider[] = [];

  constructor(private http: HttpClient) {
    this.getPaymentProviders().subscribe({
      next: (paymentProviders) => {
        if (paymentProviders && paymentProviders.length > 0) {
          this.paymentProviders = paymentProviders;
        }
      },
    });
  }

  private getPaymentProviders(): Observable<PaymentProvider[]> {
    return this.http.get<PaymentProvider[]>(this.apiUrl);
  }
}
