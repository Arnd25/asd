// src/guards/auth/auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: any): boolean {
    // Add your authentication logic here
    const authHeader = request.headers.authorization;
    return authHeader && authHeader === 'Bearer my-secret-token';
  }
}
