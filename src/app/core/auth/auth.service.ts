import { Observable } from 'rxjs';

export abstract class AuthService {
  abstract googleLogin(): Promise<void>;
  abstract logout(): Promise<void>;
  abstract getUser(): Observable<User>;
}

export interface User {
  admin: boolean;
}
