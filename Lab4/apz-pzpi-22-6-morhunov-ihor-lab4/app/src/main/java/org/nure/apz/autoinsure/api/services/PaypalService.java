package org.nure.apz.autoinsure.api.services;

import retrofit2.Call;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface PaypalService {
    @POST("api/payments/pay")
    Call<Void> createPolicyPayment(@Query("policyId") int policyId, @Query("total") double total, @Query("currency") String currency, @Query("description") String description);
}
