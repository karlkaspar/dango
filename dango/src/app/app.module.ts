import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEt from '@angular/common/locales/et';
registerLocaleData(localeEt);
import { HomeModule } from './home/home.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppInjector } from './app.injector.service';

import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { Router } from '@angular/router';
import { LogsModule } from './logs/logs.module';
import { UserModule } from './user/user.module';

// TODO: DO WE NEED MODALmODULE ?
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ModalModule.forRoot(),
    HomeModule,
    LogsModule,
    UserModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'et' },
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    injector: Injector,
    private readonly router: Router) {
    AppInjector.setInjector(injector);
  }
}
