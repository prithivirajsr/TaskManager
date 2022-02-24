import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { HeaderTokenInterceptor } from './services/header-token.interceptor';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { SharedmoduleModule } from './sharedmodule/sharedmodule.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedmoduleModule, AppRoutingModule],
  providers: [
    AuthGuard,
    UserService,
    TaskService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
