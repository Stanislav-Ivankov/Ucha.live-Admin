import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthenticationInterceptor implements HttpInterceptor {

	constructor() {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const Token = localStorage.getItem('Token');

		if (Token) {
			const cloned = request.clone({
				headers: request.headers.set('Authorization', Token)
			});

			return next.handle(cloned);
		} else {
			return next.handle(request);
		}
	}
}