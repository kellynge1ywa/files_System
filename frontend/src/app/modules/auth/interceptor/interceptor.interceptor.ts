// import { HttpInterceptorFn } from '@angular/common/http';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('token') ?? '';
//   req = req.clone({
//     setHeaders: {
//       Authorization: token ? `Token ${token}` : '',
//     },
//   });
//   return next(req);
// };
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') ?? '';
    req = req.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      },
    });
    return next.handle(req);
  }
}
