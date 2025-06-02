package org.nure.apz.autoinsure.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.entities.Measurement;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.List;

public class MeasurementsAdapter extends RecyclerView.Adapter<MeasurementsAdapter.MeasurementViewHolder> {
    private static final DateTimeFormatter TIME_FMT = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);

    private List<Measurement> measurementList = new ArrayList<>();
    private final Context context;

    public MeasurementsAdapter(Context context) {
        super();
        this.context = context;
    }

    public void setMeasurements(List<Measurement> measurements) {
        this.measurementList = measurements;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public MeasurementViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_measurement, parent, false);
        return new MeasurementViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MeasurementViewHolder holder, int position) {
        Measurement measurement = measurementList.get(position);
        holder.tvParameterType.setText(measurement.getParameterType());
        holder.tvValue.setText(measurement.getValue().toString());
        holder.tvReadingTime.setText(String.valueOf(measurement.getReadingTime().format(TIME_FMT)));
    }

    @Override
    public int getItemCount() {
        return measurementList.size();
    }

    public static class MeasurementViewHolder extends RecyclerView.ViewHolder {
        TextView tvParameterType, tvValue, tvReadingTime;

        public MeasurementViewHolder(@NonNull View itemView) {
            super(itemView);
            tvParameterType = itemView.findViewById(R.id.tvParameterType);
            tvValue = itemView.findViewById(R.id.tvValue);
            tvReadingTime = itemView.findViewById(R.id.tvReadingTime);
        }
    }
}

