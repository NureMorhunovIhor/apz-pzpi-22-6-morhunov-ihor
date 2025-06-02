package org.nure.apz.autoinsure.api.services;

import org.nure.apz.autoinsure.entities.CarType;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface CarTypeService {
    @GET("api/business-logic/car-types/{typeId}")
    Call<CarType> getCarType(@Path("typeId") long typeId);

    @GET("api/business-logic/car-types")
    Call<List<CarType>> getCarTypes();
}
