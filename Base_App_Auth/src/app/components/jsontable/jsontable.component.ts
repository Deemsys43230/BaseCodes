import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-jsontable',
  templateUrl: './jsontable.component.html',
  styleUrls: ['./jsontable.component.css']
})
export class JsontableComponent implements OnInit {

  title = 'JSON to Table Example';
  constructor (private httpService: HttpClient) { }
  
  result: string [];

  ngOnInit () {
    console.log(this.result);
    this.httpService.get('./assets/birds.json').subscribe(
      data => {
        this.result = data as string [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
