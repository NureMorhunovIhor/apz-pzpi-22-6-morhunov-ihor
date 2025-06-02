package org.nure.apz.autoinsure.api.services;

import org.nure.apz.autoinsure.entities.Measurement;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface MeasurementService {
    @GET("api/measurements/sensor/{sensorId}")
    Call<List<Measurement>> getSensorMeasurements(@Path("sensorId") int sensorId);
}
