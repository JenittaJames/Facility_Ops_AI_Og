import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, OtpRequest, OtpResponse, RegisterRequest, RegisterResponse } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl : string = environment.apiUrl;

  constructor(
    private http : HttpClient
  ){}


  registerUser(data : RegisterRequest) : Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`,data)
  }

  verifyOtp(data:OtpRequest):Observable<OtpResponse>{
    return this.http.post<OtpResponse>(`${this.apiUrl}/auth/verify-otp`,data)
  }

  resendOtp(data:OtpRequest) : Observable<OtpResponse>{
    return this.http.post<OtpResponse>(`${this.apiUrl}/auth/resend-otp`,data)
  }

  login(data : LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`,data)
  }
}
