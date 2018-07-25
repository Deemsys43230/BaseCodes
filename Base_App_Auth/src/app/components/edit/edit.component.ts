import { CoinService } from './../../coin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  coin: any;
  title = 'Edit Coin';
  angForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private coinservice: CoinService, private fb: FormBuilder) {
    this.createForm();
   }
  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ]
   });
  }
  updateCoin(name, price) {
        this.route.params.subscribe(params =>{
        this.coinservice.updateCoin(name, price,params['id']);
        this.getCoins();
        this.router.navigate(['index']);
      });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.coin = this.coinservice.editCoin(params['id']).subscribe(res => {
        this.coin = res;
      });
    });
  }
  getCoins() {
    this.coinservice.getCoins().subscribe(res => {
      this.coin = res;
    });
  }
}
