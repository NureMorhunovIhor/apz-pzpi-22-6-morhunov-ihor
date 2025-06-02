package org.nure.apz.autoinsure.activities;

import static org.nure.apz.autoinsure.utils.AndroidUtils.getTokenOrFinish;

import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.adapters.SensorsAdapter;
import org.nure.apz.autoinsure.api.ApiClient;
import org.nure.apz.autoinsure.api.services.CarService;
import org.nure.apz.autoinsure.api.services.CarTypeService;
import org.nure.apz.autoinsure.api.services.SensorService;
import org.nure.apz.autoinsure.entities.Car;
import org.nure.apz.autoinsure.entities.CarType;
import org.nure.apz.autoinsure.entities.Sensor;

import java.util.List;

public class CarActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_car);

        String token = getTokenOrFinish(this);
        if(token == null) return;

        int carId = getIntent().getIntExtra("carId", -1);
        if(carId == -1) {
            finish();
            return;
        }

        TextView tvLicensePlate = findViewById(R.id.tvLicensePlate);
        TextView tvBrandModel = findViewById(R.id.tvBrand);
        TextView tvYear = findViewById(R.id.tvYear);
        TextView tvCarType = findViewById(R.id.tvCarType);

        RecyclerView rvSensors = findViewById(R.id.rvCars);
        rvSensors.setLayoutManager(new LinearLayoutManager(CarActivity.this));

        SensorsAdapter adapter = new SensorsAdapter(CarActivity.this);
        rvSensors.setAdapter(adapter);

        SensorService sensorService = ApiClient.getAuthClient(token).create(SensorService.class);
        CarTypeService carTypeService = ApiClient.getAuthClient(token).create(CarTypeService.class);
        CarService carService = ApiClient.getAuthClient(token).create(CarService.class);

        carService.getCar(carId).enqueue(new ApiClient.CustomCallback<>() {
            @Override
            public void onResponse(@NonNull Car response) {
                tvLicensePlate.setText(response.getLicensePlate());
                tvBrandModel.setText(response.getBrand() + " " + response.getModel());
                tvYear.setText(String.valueOf(response.getYear()));
                tvCarType.setText("Loading...");

                carTypeService.getCarType(response.getCarTypeId()).enqueue(new ApiClient.CustomCallback<>() {
                    @Override
                    public void onResponse(@NonNull CarType response) {
                        tvCarType.setText(response.getCarTypeName());
                    }

                    @Override
                    public void onError(@NonNull String error, int code) {
                        Toast.makeText(CarActivity.this, "Failed to fetch car type: " + error, Toast.LENGTH_SHORT).show();
                    }
                });

                sensorService.getCarSensors(carId).enqueue(new ApiClient.CustomCallback<>() {
                    @Override
                    public void onResponse(@NonNull List<Sensor> response) {
                        adapter.setSensors(response);
                    }

                    @Override
                    public void onError(@NonNull String error, int code) {
                        Toast.makeText(CarActivity.this, "Failed to fetch cars: "+error, Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onError(@NonNull String error, int code) {
                Toast.makeText(CarActivity.this, "Failed to fetch car: " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }
}