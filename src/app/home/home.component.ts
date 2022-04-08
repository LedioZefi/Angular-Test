import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TrasactionModel } from '../dto/transaction.model.dto';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  disableFields: boolean = false;
  transactionData: TrasactionModel[] = [];
  cumulativeCashflow: number = 0;
  transactionForm: FormGroup;
  editMode: boolean = false;
  editId: number = 0;
  constructor(private homeService: HomeService, public fb: FormBuilder, private toastr: ToastrService) {
    this.transactionForm = new FormGroup({
      date: new FormControl(null),
      type: new FormControl(null),
      security: new FormControl(null),
      shared: new FormControl(null),
      value: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.getTrasactions();
    this.resestTransactionForm();
  }

  resestTransactionForm() {  
    this.disableFields = false;      
    this.transactionForm = this.fb.group({
      date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      security: ['', [Validators.required]],
      shares: ['', [Validators.required, Validators.min(0)]],
      value: [0, [Validators.required, Validators.min(0),Validators.max(this.cumulativeCashflow)]],
    });
  }

  setTransactionForm(transaction: TrasactionModel) {
    this.transactionForm = this.fb.group({
      date: [new Date(transaction.date).toISOString().slice(0, 10), [Validators.required]],
      type: [transaction.type, [Validators.required]],
      security: [transaction.security, [Validators.required]],
      shares: [transaction.shares, [Validators.required, Validators.min(0)]],
      value: [transaction.value, [Validators.required, Validators.min(0),Validators.max(this.cumulativeCashflow)]],
    });
  }

  getTrasactions(): void {
    this.homeService.getTransactions().subscribe(res => {
      this.transactionData = res;
      this.updateCumulativeCashflow(undefined);
    });
  }

  updateCumulativeCashflow(cashflow: number | undefined) {
    if(!cashflow)
      this.cumulativeCashflow = this.transactionData.reduce((sum, record) => sum + record.cashflow, 0);
    else 
      this.cumulativeCashflow += cashflow;
    this.transactionForm.controls['value'].setValidators([Validators.min(0),Validators.max(this.cumulativeCashflow)]);
  }

  submit() {
    let transactionModel = new TrasactionModel(this.transactionForm.value);
    if(!transactionModel.security)
      delete transactionModel.security;
    if(!transactionModel.shares)
      delete transactionModel.shares;
    if (this.editMode) {
      transactionModel.id = this.editId;
      this.homeService.updateTransaction(this.editId, transactionModel).subscribe(res => {
        this.transactionData[this.transactionData.findIndex(tr => tr.id == this.editId)] = res;
        this.updateCumulativeCashflow(transactionModel.cashflow);
        this.toastr.success('Transaction edited!');
        this.resestTransactionForm();
      }, err => {
        console.error(err);
        this.toastr.error(err.error['error']);
        throw err;
      });
    } else {
      this.homeService.createTransaction(transactionModel).subscribe(res => {
        this.transactionData.push(new TrasactionModel(res));
        this.updateCumulativeCashflow(transactionModel.cashflow);
        this.toastr.success('Transaction added!');
        this.resestTransactionForm();
      }, err => {
        console.error(err);
        this.toastr.error(err.error['error']);
        throw err;
      });
    }
  }

  async setEditMode(tr: TrasactionModel) {
    this.editMode = true;
    this.editId = tr.id;
    await this.setTransactionForm(tr);
    await this.changeFieldsAsPerType({value: tr.type});
  }

  deleteTransaction(tr: TrasactionModel, index: number) {
    var result = confirm("are you sure you want to delete ?");
    if (result) {
      this.homeService.deleteTransaction(tr.id).subscribe(res => {
        this.transactionData.splice(index, 1);
        this.updateCumulativeCashflow(tr.cashflow);
        this.toastr.success('Transaction deleted!');
      }, err => {
        console.error(err);
        this.toastr.error(err.error['error']);
        throw err;
      });
    }
  }

  cancel() {
    this.editMode = false;
    this.resestTransactionForm();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  async changeFieldsAsPerType(typeField: any) {
    if(typeField.value == 'withdrawal' || typeField.value == 'deposit') {
      this.disableFields = true;
      this.transactionForm.controls['security'].clearValidators();
      this.transactionForm.controls['security'].setValue('');
      this.transactionForm.controls['shares'].clearValidators();
      this.transactionForm.controls['shares'].setValue('');
    } else {
      this.disableFields = false;
      this.transactionForm.controls['security'].setValidators([Validators.required]);
      this.transactionForm.controls['security'].enable({ onlySelf: true });
      this.transactionForm.controls['shares'].setValidators([Validators.required,Validators.min(0)]);
      this.transactionForm.controls['shares'].enable({ onlySelf: false });
    }
  }

}
