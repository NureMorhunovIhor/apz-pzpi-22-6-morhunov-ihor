package org.nure.apz.autoinsure.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.activities.CarActivity;
import org.nure.apz.autoinsure.api.ApiClient;
import org.nure.apz.autoinsure.api.services.CarTypeService;
import org.nure.apz.autoinsure.entities.Car;
import org.nure.apz.autoinsure.entities.CarType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CarsAdapter extends RecyclerView.Adapter<CarsAdapter.CarViewHolder> {
    private List<Car> carList = new ArrayList<>();
    private final Map<Integer, CarType> carTypesCache;
    private final CarTypeService carTypeService;
    private final Context context;

    public CarsAdapter(Context context) {
        super();

        this.context = context;
        carTypesCache = new HashMap<>();
        carTypeService = ApiClient.getClient().create(CarTypeService.class);
    }

    public void setCars(List<Car> cars) {
        this.carList = cars;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public CarViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_car, parent, false);
        return new CarViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CarViewHolder holder, int position) {
        Car car = carList.get(position);
        holder.tvLicensePlate.setText(car.getLicensePlate());
        holder.tvBrandModel.setText(car.getBrand() + " " + car.getModel());
        holder.tvYear.setText(String.valueOf(car.getYear()));
        holder.tvCarType.setText("Loading...");

        int carTypeId = car.getCarTypeId();

        if(carTypesCache.containsKey(carTypeId)) {
            holder.tvCarType.setText(carTypesCache.get(carTypeId).getCarTypeName());
        } else {
            carTypeService.getCarType(carTypeId).enqueue(new ApiClient.CustomCallback<>() {
                @Override
                public void onResponse(@NonNull CarType resp) {
                    carTypesCache.put(carTypeId, resp);
                    holder.tvCarType.setText(resp.getCarTypeName());
                }

                @Override
                public void onError(@NonNull String error, int statusCode) {
                    Toast.makeText(context, "Failed to fetch car type with id "+carTypeId, Toast.LENGTH_SHORT).show();
                }
            });
        }

        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, CarActivity.class);
            intent.putExtra("carId", car.getId());
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return carList.size();
    }

    public static class CarViewHolder extends RecyclerView.ViewHolder {
        TextView tvLicensePlate, tvBrandModel, tvYear, tvCarType;

        public CarViewHolder(@NonNull View itemView) {
            super(itemView);
            tvLicensePlate = itemView.findViewById(R.id.tvLicensePlate);
            tvBrandModel = itemView.findViewById(R.id.tvBrand);
            tvYear = itemView.findViewById(R.id.tvYear);
            tvCarType = itemView.findViewById(R.id.tvCarType);
        }
    }
}

