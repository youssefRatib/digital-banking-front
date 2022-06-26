import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerId! : number ;
  customer! : any;
  newCustomerFormGroup! : FormGroup;
  constructor(private route : ActivatedRoute,private fb : FormBuilder, private customerService:CustomerService, private router:Router) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.newCustomerFormGroup=this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email : this.fb.control(null,[Validators.required, Validators.email])
    });
    if(this.customer){
      this.newCustomerFormGroup.controls['name'].setValue(this.customer.name);
      this.newCustomerFormGroup.controls['email'].setValue(this.customer.email);
    }


  }

  handleEditCustomer() {
    this.customerService.editCustomer(this.newCustomerFormGroup.value,this.customerId)
      .subscribe({
        next:(res)=>{
          alert("Client bien modifié");
          this.router.navigateByUrl("/customers");
        },
        error:()=>{
          alert("Client nom modifié");
        }
      })
  }

}
