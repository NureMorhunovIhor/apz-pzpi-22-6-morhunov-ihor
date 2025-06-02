package org.nure.apz.autoinsure.activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.api.ApiClient;
import org.nure.apz.autoinsure.api.requests.LoginRequest;
import org.nure.apz.autoinsure.api.responses.AuthResponse;
import org.nure.apz.autoinsure.api.services.AuthService;

public class LoginActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);

        EditText emailEdit = findViewById(R.id.edit_email);
        EditText passwordEdit = findViewById(R.id.edit_password);
        Button loginButton = findViewById(R.id.button_login);
        TextView registerLink = findViewById(R.id.text_register_link);

        AuthService authService = ApiClient.getClient().create(AuthService.class);
        SharedPreferences prefs = getSharedPreferences("app_prefs", MODE_PRIVATE);

        loginButton.setOnClickListener(v -> {
            String email = emailEdit.getText().toString();
            String password = passwordEdit.getText().toString();

            authService.login(new LoginRequest(email, password)).enqueue(new ApiClient.CustomCallback<>() {
                @Override
                public void onResponse(@NonNull AuthResponse response) {
                    prefs.edit().putString("authToken", response.getToken()).putLong("userId", response.getUserId()).apply();
                    startActivity(new Intent(LoginActivity.this, MainActivity.class));
                    finish();
                }

                @Override
                public void onError(@NonNull String error, int code) {
                    Toast.makeText(LoginActivity.this, "Failed to login: "+error, Toast.LENGTH_SHORT).show();
                }
            });
        });

        registerLink.setOnClickListener(v -> {
            startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
            finish();
        });
    }
}