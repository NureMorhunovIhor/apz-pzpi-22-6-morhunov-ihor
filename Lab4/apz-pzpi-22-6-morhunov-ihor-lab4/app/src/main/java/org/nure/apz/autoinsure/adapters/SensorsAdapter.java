package org.nure.apz.autoinsure.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.activities.CarActivity;
import org.nure.apz.autoinsure.activities.SensorActivity;
import org.nure.apz.autoinsure.entities.Sensor;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.List;

public class SensorsAdapter extends RecyclerView.Adapter<SensorsAdapter.SensorViewHolder> {
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM);

    private List<Sensor> sensorList = new ArrayList<>();
    private final Context context;

    public SensorsAdapter(Context context) {
        super();
        this.context = context;
    }

    public void setSensors(List<Sensor> sensors) {
        this.sensorList = sensors;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public SensorViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_sensor, parent, false);
        return new SensorViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull SensorViewHolder holder, int position) {
        Sensor sensor = sensorList.get(position);
        holder.tvSensorType.setText(sensor.getSensorType());
        holder.tvCurrentState.setText(sensor.getSensorType());
        holder.tvLastUpdate.setText(String.valueOf(sensor.getLastUpdate().format(DATE_FMT)));

        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, SensorActivity.class);
            intent.putExtra("sensorId", sensor.getId());
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return sensorList.size();
    }

    public static class SensorViewHolder extends RecyclerView.ViewHolder {
        TextView tvSensorType, tvCurrentState, tvLastUpdate;

        public SensorViewHolder(@NonNull View itemView) {
            super(itemView);
            tvSensorType = itemView.findViewById(R.id.tvSensorType);
            tvCurrentState = itemView.findViewById(R.id.tvCurrentState);
            tvLastUpdate = itemView.findViewById(R.id.tvLastUpdate);
        }
    }
}

