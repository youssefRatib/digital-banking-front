import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BankingAccount, ListAccounts} from "../model/account.model";
import {AccountsService} from "../services/accounts.service";

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit {

  accountsObservable! : Observable<ListAccounts>
  errorMessage!: string;
  currentPage : number =0;
  pageSize : number =5;
  constructor(private accountService : AccountsService, private fb : FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.handleAccounts();
  }

  handleAccounts() {
    this.accountsObservable=this.accountService.getAccounts(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleAccounts();
  }

  handleOperations(bankingAccount: BankingAccount) {
    this.router.navigateByUrl("/operations?bankingAccountId="+bankingAccount.id);
  }


}
