import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BaseComponent } from './_common/base/base.component';
import { RouterModule } from '@angular/router';  // TODO: MAKE SURE WE NEED ROUTER

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BaseComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
