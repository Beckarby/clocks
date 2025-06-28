import { Injectable } from '@angular/core';
import {
  Auth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  authState,
} from '@angular/fire/auth';
import type { User } from 'firebase/auth';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class AuthService {
	user$: Observable<User | null>;

  	constructor(private auth: Auth) { 
    	this.user$ = authState(this.auth);
  	}

  	async register(email: string, password: string): Promise<User | null> {
    	try {
      	const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      	return userCredential.user;
    	} catch (error: any) {
    	console.error('Registration error:', error);
    	throw error;
    	}
  	} 

	async login(email: string, password: string): Promise<User | null> {
		try {
			const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
			return userCredential.user;
		} catch (error: any) {
			console.error('Login error:', error);
			throw error;
		}
	}

	async logout(): Promise<void> {
		try {
			await signOut(this.auth);
		} catch (error: any) {
			console.error('Logout error:', error);
			throw error;
		}
	}


}
