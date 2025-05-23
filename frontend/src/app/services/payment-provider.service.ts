import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PaymentProvider} from "../models/paymentProvider";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentProviderService {

  private apiUrl = environment.backendApiUrl + 'payment-provider';

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
