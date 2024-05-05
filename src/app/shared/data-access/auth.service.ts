import { Injectable, inject, signal } from "@angular/core";
import { AUTH } from "../../app.config";
import { User, createUserWithEmailAndPassword, updateProfile, user } from "@angular/fire/auth";
import { Observable, from } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    firebaseAuth = inject(AUTH);
    currentUserSig = signal<User | undefined | null>(undefined);
  user$ = user(this.firebaseAuth);

  register(
    email: string,
    username: string,
    password: string,
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then((response) =>
      updateProfile(response.user, { displayName: 'username' }),
    );

    return from(promise);
  }
}