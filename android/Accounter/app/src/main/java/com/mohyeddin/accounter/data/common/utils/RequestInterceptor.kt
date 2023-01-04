package com.mohyeddin.accounter.data.common.utils

import com.mohyeddin.accounter.common.Prefs
import okhttp3.Interceptor
import okhttp3.Response

class RequestInterceptor(val prefs: Prefs) : Interceptor{
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = prefs.getToken()
        val newRequest = chain.request().newBuilder()
            .addHeader("x-auth-token",token?:"")
            .build()
        return chain.proceed(newRequest)
    }
}