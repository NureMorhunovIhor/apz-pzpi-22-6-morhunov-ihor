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
import org.nure.apz.autoinsure.api.requests.RegisterRequest;
import org.nure.apz.autoinsure.api.responses.AuthResponse;
import org.nure.apz.autoinsure.api.services.AuthService;

public class RegisterActivity extends AppCompatActivity {
    private EditText firstNameEdit, lastNameEdit, emailEdit, passwordEdit, confirmEdit;
    private Button registerButton;
    private TextView loginLink;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_register);

        firstNameEdit = findViewById(R.id.edit_first_name);
        lastNameEdit = findViewById(R.id.edit_last_name);
        emailEdit = findViewById(R.id.edit_email);
        passwordEdit = findViewById(R.id.edit_password);
        confirmEdit = findViewById(R.id.edit_confirm_password);
        registerButton = findViewById(R.id.button_register);
        loginLink = findViewById(R.id.text_login_link);

        AuthService authService = ApiClient.getClient().create(AuthService.class);
        SharedPreferences prefs = getSharedPreferences("app_prefs", MODE_PRIVATE);

        registerButton.setOnClickListener(v -> {
            String first = firstNameEdit.getText().toString();
            String last = lastNameEdit.getText().toString();
            String email = emailEdit.getText().toString();
            String password = passwordEdit.getText().toString();
            String confirm = confirmEdit.getText().toString();

            if (!password.equals(confirm)) {
                Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show();
                return;
            }

            authService.register(new RegisterRequest(email, password, first, last, "client")).enqueue(new ApiClient.CustomCallback<>() {
                @Override
                public void onResponse(@NonNull AuthResponse response) {
                    prefs.edit().putString("authToken", response.getToken()).apply();
                    startActivity(new Intent(RegisterActivity.this, MainActivity.class));
                    finish();
                }

                @Override
                public void onError(@NonNull String error, int code) {
                    Toast.makeText(RegisterActivity.this, "Failed to register: "+error, Toast.LENGTH_SHORT).show();
                }
            });
        });

        loginLink.setOnClickListener(v -> {
            startActivity(new Intent(RegisterActivity.this, LoginActivity.class));
            finish();
        });
    }
}