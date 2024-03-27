import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PaginaModule } from './paginas/PaginaModule';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserInterceptorService } from './interceptores/UserInterceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginaModule,
    HttpClientModule
  ],
  providers: [
    //{provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
