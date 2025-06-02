package org.nure.apz.autoinsure.fragments;

import static org.nure.apz.autoinsure.utils.AndroidUtils.getTokenOrFinish;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.adapters.CarsAdapter;
import org.nure.apz.autoinsure.adapters.PolicyAdapter;
import org.nure.apz.autoinsure.api.ApiClient;
import org.nure.apz.autoinsure.api.services.CarService;
import org.nure.apz.autoinsure.api.services.PaypalService;
import org.nure.apz.autoinsure.api.services.PolicyService;
import org.nure.apz.autoinsure.entities.Car;
import org.nure.apz.autoinsure.entities.Policy;

import java.util.List;

public class PoliciesFragment extends Fragment {
    private PolicyAdapter adapter;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_policies, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        String token = getTokenOrFinish(getActivity());
        if(token == null) return;

        CarService carService = ApiClient.getAuthClient(token).create(CarService.class);
        PaypalService payService = ApiClient.getAuthClient(token).create(PaypalService.class);

        RecyclerView rvCars = view.findViewById(R.id.rvPolicies);
        rvCars.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new PolicyAdapter(requireContext(), carService, payService);
        rvCars.setAdapter(adapter);

        SharedPreferences prefs = requireContext().getSharedPreferences("app_prefs", Context.MODE_PRIVATE);
        long userId = prefs.getLong("userId", -1);

        PolicyService policyService = ApiClient.getAuthClient(token).create(PolicyService.class);
        policyService.getUserPolicies(userId).enqueue(new ApiClient.CustomCallback<>() {
            @Override
            public void onResponse(@NonNull List<Policy> response) {
                adapter.setPolicies(response);
            }

            @Override
            public void onError(@NonNull String error, int code) {
                Toast.makeText(getContext(), "Failed to fetch policies: "+error, Toast.LENGTH_SHORT).show();
            }
        });
    }
}