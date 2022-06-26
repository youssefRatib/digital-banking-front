import {Customer} from "./customer.model";

export interface AccountDetails {
  accountId:            string;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  accountOperationDTOS: AccountOperation[];
}

export interface ListAccounts {
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  bankingAccounts : BankingAccount[];
}

export interface BankingAccount {
  type:                 string;
  id:                   string;
  balance:              number;
  createdAt:            Date;
  status:               string;
  customerDTO:          Customer;
}


export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  operationType:          string;
  description:   string;
}
