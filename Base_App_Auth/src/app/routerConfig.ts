import { Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { IndexComponent } from './components/index/index.component';
import { CoinsComponent } from './components/coins/coins.component';
import {LoginComponent} from './components/login/login.component';
import {UploadComponent} from './components/upload/upload.component';

export const appRoutes: Routes = [
  { path: 'create', 
    component: CreateComponent 
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  { path: 'index',
    component: IndexComponent
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'upload',
    component: UploadComponent
  }
];