import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../coin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  coin: any;
  title = 'Add Coin';
  angForm: FormGroup;
  constructor(private router: Router, private coinservice: CoinService, private fb: FormBuilder) {
    this.createForm();
   }
  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ]
   });
  }
  addCoin(name, price) {
      this.coinservice.addCoin(name, price);
      this.getCoins();
      this.router.navigate(['index']);
  }
  ngOnInit() {
  }
  getCoins() {
    this.coinservice.getCoins().subscribe(res => {
      this.coin = res;
    });
  }
}