package com.mohyeddin.accounter.data.common.modules

import com.mohyeddin.accounter.common.BASE_URL
import com.mohyeddin.accounter.data.common.utils.RequestInterceptor
import okhttp3.Cache
import okhttp3.OkHttpClient
import org.koin.android.ext.koin.androidContext
import org.koin.dsl.module
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


val networkModule = module {
    includes(prefsModule)
    single { RequestInterceptor(get()) }

    single {
        OkHttpClient.Builder().apply {
            addInterceptor(get())
            cache(Cache(androidContext().cacheDir,6*1024*1024))
        }.build()
    }

    single {
        Retrofit.Builder().apply {
            addConverterFactory(GsonConverterFactory.create())
            client(get())
            baseUrl(BASE_URL)
        }.build()
    }
}