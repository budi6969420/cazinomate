import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PayoutItemModel} from "../models/payoutItemModel";
import {PayoutSuccessfulResponseModel} from "../models/payoutSuccessfulResponseModel";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PayoutItemService {
  public items: PayoutItemModel[] = [];
  private placeholderPayoutItems: PayoutItemModel[] = [];
  private apiUrl: string = environment.backendApiUrl + "payout";

  constructor(private http: HttpClient) {
    this.http.get<PayoutItemModel[]>(`${this.apiUrl}`).subscribe({next: (data: PayoutItemModel[]) => {
        this.items = data.sort((a, b) => a.cost - b.cost);
        if (this.items.length === 0) {
          this.items = this.placeholderPayoutItems.sort((a, b) => a.cost - b.cost)
        }
      }, error: (err) => {
        this.items = this.placeholderPayoutItems.sort((a, b) => a.cost - b.cost);
      }})
  }

  public getPaymentLink(payoutItemId: string) {
    return this.http.post<PayoutSuccessfulResponseModel>(this.apiUrl, { id: payoutItemId });

  }
}
