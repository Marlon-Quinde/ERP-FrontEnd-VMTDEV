import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/localStorage.service';
import { EnumKeys } from '../enums/keys';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from '../consts/messages';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService)
  const toastr = inject(ToastrService)

  const token = localStorage.getItem(EnumKeys.JWT)

  if(token){
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(req).pipe(
    catchError(( err: HttpErrorResponse) => {
      if(err.status.toString().includes('50')){
        toastr.error(MESSAGES.ERROR.GENERAL)
      } else {
        toastr.error(err.message)
      }

      return throwError( () => err)
    })
  );
};
