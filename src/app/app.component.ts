import { Component } from '@angular/core';
import { Customer } from './_models/customer.model';
import { PagingConfig } from './_models/paging-config.model';
import { CustomerService } from './_services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements PagingConfig {
  title = 'ngx-paging-sample';

  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  tableSize: number[] = [5, 10, 15, 20];
  customers = new Array<Customer>();

  pagingConfig: PagingConfig = {} as PagingConfig;

  constructor(private customerService: CustomerService){
    this.getCustomers();

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  getCustomers(){
    this.customerService.getCustomers()
    .subscribe(res=> {
      this.customers = res;
      this.pagingConfig.totalItems = res.length;
    });
  }

  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.getCustomers();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getCustomers();
  }
}
