package org.nure.apz.autoinsure.activities;

import static org.nure.apz.autoinsure.utils.AndroidUtils.getTokenOrFinish;

import android.content.DialogInterface;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;
import android.app.AlertDialog;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.adapters.MeasurementsAdapter;
import org.nure.apz.autoinsure.api.ApiClient;
import org.nure.apz.autoinsure.api.services.MeasurementService;
import org.nure.apz.autoinsure.api.services.SensorService;
import org.nure.apz.autoinsure.entities.Measurement;
import org.nure.apz.autoinsure.entities.Sensor;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.List;

public class SensorActivity extends AppCompatActivity {
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM);

    private TextView tvSensorType, tvCurrentState, tvLastUpdate;
    private Button btnEditSensor, btnDeleteSensor;
    private Sensor currentSensor;
    private SensorService sensorService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_sensor);

        String token = getTokenOrFinish(this);
        if (token == null) return;

        int sensorId = getIntent().getIntExtra("sensorId", -1);
        if (sensorId == -1) {
            finish();
            return;
        }

        tvSensorType = findViewById(R.id.tvSensorType);
        tvCurrentState = findViewById(R.id.tvCurrentState);
        tvLastUpdate = findViewById(R.id.tvLastUpdate);
        btnEditSensor = findViewById(R.id.btnEditSensor);
        btnDeleteSensor = findViewById(R.id.btnDeleteSensor);
        RecyclerView rvSensors = findViewById(R.id.rvMeasurements);
        rvSensors.setLayoutManager(new LinearLayoutManager(this));
        MeasurementsAdapter adapter = new MeasurementsAdapter(this);
        rvSensors.setAdapter(adapter);

        sensorService = ApiClient.getAuthClient(token).create(SensorService.class);
        MeasurementService measurementService = ApiClient.getAuthClient(token).create(MeasurementService.class);

        sensorService.getSensor(sensorId).enqueue(new ApiClient.CustomCallback<>() {
            @Override
            public void onResponse(@NonNull Sensor response) {
                currentSensor = response;
                updateSensorUI(response);

                measurementService.getSensorMeasurements(sensorId).enqueue(new ApiClient.CustomCallback<>() {
                    @Override
                    public void onResponse(@NonNull List<Measurement> response) {
                        adapter.setMeasurements(response);
                    }

                    @Override
                    public void onError(@NonNull String error, int code) {
                        Toast.makeText(SensorActivity.this, "Failed to fetch measurements: " + error, Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onError(@NonNull String error, int code) {
                Toast.makeText(SensorActivity.this, "Failed to fetch sensor: " + error, Toast.LENGTH_SHORT).show();
            }
        });

        btnEditSensor.setOnClickListener(v -> showEditDialog(token, sensorId));
        btnDeleteSensor.setOnClickListener(v -> showDeleteDialog(token, sensorId));
    }

    private void updateSensorUI(Sensor sensor) {
        tvSensorType.setText(sensor.getSensorType());
        tvCurrentState.setText(sensor.getSensorType());
        tvLastUpdate.setText(sensor.getLastUpdate().format(DATE_FMT));
    }
    private void showEditDialog(String token, int sensorId) {
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_edit_sensor, null);
        EditText etSensorType = dialogView.findViewById(R.id.etSensorType);

        etSensorType.setText(currentSensor.getSensorType());

        new AlertDialog.Builder(this)
                .setTitle("Редагувати сенсор")
                .setView(dialogView)
                .setPositiveButton("Зберегти", (dialog, which) -> {
                    String newType = etSensorType.getText().toString().trim();
                    if (newType.isEmpty()) {
                        Toast.makeText(this, "Тип сенсора не може бути порожнім", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    currentSensor.setSensorType(newType);

                    sensorService.updateSensor(sensorId, currentSensor).enqueue(new ApiClient.CustomCallback<Sensor>() {
                        @Override
                        public void onResponse(@NonNull Sensor response) {
                            Toast.makeText(SensorActivity.this, "Сенсор оновлено", Toast.LENGTH_SHORT).show();
                            updateSensorUI(response);
                        }

                        @Override
                        public void onError(@NonNull String error, int code) {
                            Toast.makeText(SensorActivity.this, "Помилка оновлення: " + error, Toast.LENGTH_SHORT).show();
                        }
                    });
                })
                .setNegativeButton("Скасувати", null)
                .show();
    }

    private void showDeleteDialog(String token, int sensorId) {
        new AlertDialog.Builder(this)
                .setTitle("Видалити сенсор")
                .setMessage("Ви впевнені, що хочете видалити цей сенсор?")
                .setPositiveButton("Так", (dialog, which) -> {
                    sensorService.deleteSensor(sensorId).enqueue(new ApiClient.CustomCallback<>() {
                        @Override
                        public void onResponse(Void unused) {
                            Toast.makeText(SensorActivity.this, "Сенсор видалено", Toast.LENGTH_SHORT).show();
                            finish();
                        }

                        @Override
                        public void onError(@NonNull String error, int code) {
                            Toast.makeText(SensorActivity.this, "Помилка видалення: " + error, Toast.LENGTH_SHORT).show();
                        }
                    });
                })
                .setNegativeButton("Скасувати", null)
                .show();
    }
}
