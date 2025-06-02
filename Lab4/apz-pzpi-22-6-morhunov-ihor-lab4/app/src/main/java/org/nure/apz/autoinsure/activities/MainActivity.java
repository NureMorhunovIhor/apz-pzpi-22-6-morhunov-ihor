package org.nure.apz.autoinsure.activities;

import static org.nure.apz.autoinsure.utils.AndroidUtils.getTokenOrFinish;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.Fragment;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.firebase.messaging.FirebaseMessaging;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.api.ApiClient;
import org.nure.apz.autoinsure.api.services.CarService;
import org.nure.apz.autoinsure.fragments.AccountFragment;
import org.nure.apz.autoinsure.fragments.CarsFragment;
import org.nure.apz.autoinsure.fragments.PoliciesFragment;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        String token = getTokenOrFinish(this);
        if(token == null) return;

        if (savedInstanceState == null) {
            goToFragment(AccountFragment.class);
        }

        BottomNavigationView nav = findViewById(R.id.bottom_navigation);
        nav.setSelectedItemId(R.id.nav_account);
        nav.setOnItemSelectedListener(item -> {
            final int id = item.getItemId();
            if(id == R.id.nav_cars) {
                goToFragment(CarsFragment.class);
                return true;
            } else if(id == R.id.nav_policies) {
                goToFragment(PoliciesFragment.class);
                return true;
            } else if(id == R.id.nav_account) {
                goToFragment(AccountFragment.class);
                return true;
            }

            return false;
        });

        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task -> {
            if (!task.isSuccessful()) {
                Log.w("fcm", "Fetching FCM registration token failed", task.getException());
                return;
            }

            String fcmToken = task.getResult();

            /*userService.registerDevice(new RegisterFcmRequest(fcmToken)).enqueue(new ApiClient.CustomCallback<>() {
                @Override
                public void onResponse(@NonNull Void response) {
                }

                @Override
                public void onError(@NonNull String error, int code) {
                }
            });*/

            Log.d("fcm", fcmToken);
        });
    }

    private void goToFragment(Class<? extends Fragment> cls) {
        getSupportFragmentManager().beginTransaction()
                .setReorderingAllowed(true)
                .replace(R.id.fragment_container, cls, null)
                .commit();
    }
}