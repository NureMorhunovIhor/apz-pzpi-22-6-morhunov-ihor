package org.nure.apz.autoinsure.api.services;

import org.nure.apz.autoinsure.entities.Policy;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface PolicyService {
    @GET("api/policies/user/{userId}")
    Call<List<Policy>> getUserPolicies(@Path("userId") long userId);
}
