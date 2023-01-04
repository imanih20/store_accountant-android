package com.mohyeddin.accounter

import android.app.Application
import com.mohyeddin.accounter.data.auth.authModule
import com.mohyeddin.accounter.data.statistic.statisticModule
import com.mohyeddin.accounter.data.transaction.transactionModule
import com.mohyeddin.accounter.data.type.typeModule
import com.mohyeddin.accounter.data.user.userModule
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin

class App : Application() {
    override fun onCreate() {
        super.onCreate()

        startKoin {
            androidLogger()
            androidContext(this@App)
            modules(authModule, typeModule, statisticModule, transactionModule, userModule)
        }
    }
}