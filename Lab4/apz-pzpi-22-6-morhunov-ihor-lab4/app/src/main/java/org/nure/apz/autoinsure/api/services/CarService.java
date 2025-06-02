package org.nure.apz.autoinsure.api.services;

import org.nure.apz.autoinsure.entities.Car;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface CarService {
    @GET("api/cars/user/{userId}")
    Call<List<Car>> getUserCars(@Path("userId") long userId);

    @GET("api/cars/{carId}")
    Call<Car> getCar(@Path("carId") int carId);
}
