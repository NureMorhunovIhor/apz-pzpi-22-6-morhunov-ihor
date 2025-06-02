package org.nure.apz.autoinsure.api.services;

import org.nure.apz.autoinsure.entities.Sensor;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface SensorService {
    @GET("api/sensors/car/{carId}")
    Call<List<Sensor>> getCarSensors(@Path("carId") int carId);

    @GET("api/sensors/{sensorId}")
    Call<Sensor> getSensor(@Path("sensorId") int sensorId);

    @PUT("api/sensors/{sensorId}")
    Call<Sensor> updateSensor(@Path("sensorId") int sensorId, @Body Sensor sensor);

    @DELETE("api/sensors/{sensorId}")
    Call<Void> deleteSensor(@Path("sensorId") int sensorId);
    @POST("sensors")
    Call<Sensor> createSensor(@Body Sensor sensor);

}
