import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginAPageRoutingModule } from './login-a-routing.module';

import { LoginAPage } from './login-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginAPageRoutingModule
  ],
  declarations: [LoginAPage]
})
export class LoginAPageModule {}
