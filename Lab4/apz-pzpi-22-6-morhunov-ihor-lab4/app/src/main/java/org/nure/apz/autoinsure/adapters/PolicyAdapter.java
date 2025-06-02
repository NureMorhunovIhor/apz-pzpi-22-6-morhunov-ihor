package org.nure.apz.autoinsure.adapters;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import org.nure.apz.autoinsure.R;
import org.nure.apz.autoinsure.api.ApiClient;
import org.nure.apz.autoinsure.api.services.CarService;
import org.nure.apz.autoinsure.api.services.PaypalService;
import org.nure.apz.autoinsure.entities.Car;
import org.nure.apz.autoinsure.entities.CarType;
import org.nure.apz.autoinsure.entities.Policy;

import java.io.IOException;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class PolicyAdapter extends RecyclerView.Adapter<PolicyAdapter.CarViewHolder> {
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM);

    private List<Policy> policiesList = new ArrayList<>();
    private final Map<Integer, Car> carsCache;
    private final CarService carService;
    private final PaypalService payService;
    private final Context context;

    public PolicyAdapter(Context context, CarService carService, PaypalService payService) {
        super();

        carsCache = new HashMap<>();

        this.context = context;
        this.carService = carService;
        this.payService = payService;
    }

    public void setPolicies(List<Policy> policies) {
        this.policiesList = policies;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public CarViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_car_policy, parent, false);
        return new CarViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CarViewHolder holder, int position) {
        Policy policy = policiesList.get(position);

        holder.tvStartDate.setText("Start: "+policy.getStartDate().format(DATE_FMT));
        holder.tvEndDate.setText("End: "+policy.getEndDate().format(DATE_FMT));
        holder.tvStatus.setText(policy.getStatus());
        holder.tvPrice.setText(NumberFormat.getCurrencyInstance().format(policy.getPrice()));

        holder.tvLicensePlate.setText("Loading...");

        int carId = policy.getCarId();

        if (carsCache.containsKey(carId)) {
            holder.tvLicensePlate.setText(carsCache.get(carId).getLicensePlate());
        } else {
            carService.getCar(carId).enqueue(new ApiClient.CustomCallback<>() {
                @Override
                public void onResponse(@NonNull Car resp) {
                    carsCache.put(carId, resp);
                    holder.tvLicensePlate.setText(resp.getLicensePlate());
                }

                @Override
                public void onError(@NonNull String error, int statusCode) {
                    Toast.makeText(context, "Failed to fetch car with id " + carId, Toast.LENGTH_SHORT).show();
                }
            });
        }

        holder.btnPay.setOnClickListener(v -> {
            Request request = payService.createPolicyPayment(policy.getId(), policy.getPrice().doubleValue(), "USD", "Policy Payment").clone().request();
            OkHttpClient client = new OkHttpClient();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(@NonNull Call call, @NonNull IOException e) {
                    Toast.makeText(context, "Failed to create payment!", Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                    ResponseBody body = response.body();
                    if(body == null) {
                        Toast.makeText(context, "Failed to create payment!", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    String respStr = body.string();
                    if(!respStr.startsWith("http")) {
                        Toast.makeText(context, "Failed to create payment!", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    Intent paymentIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(respStr));
                    context.startActivity(paymentIntent);
                }
            });
        });
    }

    @Override
    public int getItemCount() {
        return policiesList.size();
    }

    public static class CarViewHolder extends RecyclerView.ViewHolder {
        TextView tvLicensePlate;
        TextView tvStartDate;
        TextView tvEndDate;
        TextView tvStatus;
        TextView tvPrice;
        Button btnPay;

        public CarViewHolder(@NonNull View itemView) {
            super(itemView);
            tvLicensePlate = itemView.findViewById(R.id.tvLicensePlate);
            tvStartDate = itemView.findViewById(R.id.tvStartDate);
            tvEndDate = itemView.findViewById(R.id.tvEndDate);
            tvStatus = itemView.findViewById(R.id.tvStatus);
            tvPrice = itemView.findViewById(R.id.tvPrice);
            btnPay = itemView.findViewById(R.id.btnPay);
        }
    }
}

