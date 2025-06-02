package org.nure.apz.autoinsure.api.services;

import org.nure.apz.autoinsure.api.requests.LoginRequest;
import org.nure.apz.autoinsure.api.requests.RegisterRequest;
import org.nure.apz.autoinsure.api.responses.AuthResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface AuthService {
    @POST("api/auth/login")
    Call<AuthResponse> login(@Body LoginRequest body);

    @POST("api/auth/register")
    Call<AuthResponse> register(@Body RegisterRequest body);
}
