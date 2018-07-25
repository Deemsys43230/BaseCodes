import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//routing Modules
import { RouterModule } from '@angular/router';
//import http Module
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {  FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import { appRoutes } from './routerConfig';
import { CoinService } from './coin.service';
import { CoinsComponent } from './components/coins/coins.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';
import { JsontableComponent } from './components/jsontable/jsontable.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CreateComponent,
    EditComponent,
    CoinsComponent,
    LoginComponent,
    UploadComponent,
    FileSelectDirective,
    JsontableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CoinService],
  bootstrap: [AppComponent]
})

export class AppModule { }
