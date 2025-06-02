package org.nure.apz.autoinsure.utils;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import org.nure.apz.autoinsure.activities.LoginActivity;

public class AndroidUtils {
    public static String getTokenOrFinish(Activity ctx) {
        SharedPreferences prefs = ctx.getSharedPreferences("app_prefs", Context.MODE_PRIVATE);
        String token = prefs.getString("authToken", null);
        if(token == null) {
            ctx.startActivity(new Intent(ctx, LoginActivity.class));
            ctx.finish();
            return null;
        }

        return token;
    }
}
