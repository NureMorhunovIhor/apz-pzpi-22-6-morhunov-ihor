package org.nure.apz.autoinsure.fragments;

import static org.nure.apz.autoinsure.utils.AndroidUtils.getTokenOrFinish;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.activities.LoginActivity;
import org.nure.apz.autoinsure.activities.MainActivity;
import org.nure.apz.autoinsure.adapters.CarsAdapter;
import org.nure.apz.autoinsure.api.ApiClient;
import org.nure.apz.autoinsure.api.services.CarService;
import org.nure.apz.autoinsure.entities.Car;

import java.util.List;

public class CarsFragment extends Fragment {
    private CarsAdapter adapter;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_cars, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        String token = getTokenOrFinish(getActivity());
        if(token == null) return;

        RecyclerView rvCars = view.findViewById(R.id.rvCars);
        rvCars.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new CarsAdapter(requireContext());
        rvCars.setAdapter(adapter);

        SharedPreferences prefs = requireContext().getSharedPreferences("app_prefs", Context.MODE_PRIVATE);
        long userId = prefs.getLong("userId", -1);

        CarService carService = ApiClient.getAuthClient(token).create(CarService.class);
        carService.getUserCars(userId).enqueue(new ApiClient.CustomCallback<>() {
            @Override
            public void onResponse(@NonNull List<Car> response) {
                adapter.setCars(response);
            }

            @Override
            public void onError(@NonNull String error, int code) {
                Toast.makeText(getContext(), "Failed to fetch cars: "+error, Toast.LENGTH_SHORT).show();
            }
        });
    }
}