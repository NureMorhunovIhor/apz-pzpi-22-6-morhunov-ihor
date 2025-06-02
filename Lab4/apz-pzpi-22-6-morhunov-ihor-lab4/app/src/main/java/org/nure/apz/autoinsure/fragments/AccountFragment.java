package org.nure.apz.autoinsure.fragments;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.activities.LoginActivity;

public class AccountFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_account, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        Button logoutButton = view.findViewById(R.id.button_logout);
        logoutButton.setOnClickListener(v -> {
            Activity activity = getActivity();

            SharedPreferences prefs = activity.getSharedPreferences("app_prefs", Context.MODE_PRIVATE);
            prefs.edit().remove("authToken").remove("userId").apply();
            activity.startActivity(new Intent(activity, LoginActivity.class));
            activity.finish();
        });
    }
}