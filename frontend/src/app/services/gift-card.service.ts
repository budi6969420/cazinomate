import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, of} from 'rxjs';
import {GiftCardDto} from "../models/GiftCardDto";
import {GiftCardInfoDto} from "../models/GiftCardInfoDto";

@Injectable({
  providedIn: 'root'
})
export class GiftCardService {

  private apiUrl: string = environment.backendApiUrl + 'giftcard/use';

  constructor(private http: HttpClient) { }

  public redeemGiftCard(code: string)
  {
    let dto: GiftCardDto = {id: code};

    try {
      return this.http.post<GiftCardInfoDto>(this.apiUrl, dto);
    }
    catch (error) {
      return null;
    }
  }
}
