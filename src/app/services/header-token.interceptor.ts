import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeaderTokenInterceptor implements HttpInterceptor {
  //Injecting 3rd party services
  constructor(private cookieService: CookieService) {}

  /*This function will intercept the original request,
  cloned the original request because the original request is immutable,
  so that we can't able to modify original request,
  futher the cloned request is modified with some data,
  finally the cloned rqquest is send to server*/
  intercept(request: any, next: any) {
    const token = this.cookieService.get('loginToken');
    let clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(clonedRequest);
  }
}
