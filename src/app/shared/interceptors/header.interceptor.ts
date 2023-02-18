import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { GlobalHelper } from '../services/globalHelper';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private helper: GlobalHelper) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
        }
        return next.handle(request);
    }
}
