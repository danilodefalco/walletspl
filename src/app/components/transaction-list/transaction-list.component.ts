import { Component, OnInit, Input } from '@angular/core';
import { TransactionModel } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  @Input()
  list: TransactionModel[];
  
  @Input()
  type:string;

  constructor() { }

  ngOnInit(): void {
  }

}
