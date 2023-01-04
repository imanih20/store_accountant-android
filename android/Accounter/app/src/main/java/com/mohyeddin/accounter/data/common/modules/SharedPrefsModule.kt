package com.mohyeddin.accounter.data.common.modules

import com.mohyeddin.accounter.common.Prefs
import org.koin.android.ext.koin.androidContext
import org.koin.dsl.module

val prefsModule = module {
    factory { Prefs(androidContext()) }
}