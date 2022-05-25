import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {BankingAccount} from "../model/account.model";
import {catchError, Observable, throwError} from "rxjs";
import {AccountsService} from "../services/accounts.service";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId! : string ;
  customer! : Customer;
  errorMessage!: string;
  accountObservable! : Observable<Array<BankingAccount>>;
  constructor(private route : ActivatedRoute, private router :Router,private accountService : AccountsService) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.handleCustomerAccounts(this.customer);

  }
  handleCustomerAccounts(customer: Customer) {
    this.accountObservable = this.accountService.getCustomerAccounts(customer).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }


}
