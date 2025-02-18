import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Customer } from '../models/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly baseUrl = environment.apiUrl;
  readonly http = inject(HttpClient);

  constructor() { }

  getCustomers() {
    return this.http.get<Customer[]>(`${this.baseUrl}/customer`);
  }

}