package com.mohyeddin.accounter.data.type

import com.mohyeddin.accounter.data.common.modules.networkModule
import com.mohyeddin.accounter.data.statistic.remote.StatisticService
import com.mohyeddin.accounter.data.transaction.remote.TransactionService
import com.mohyeddin.accounter.data.type.repository.TypeRepositoryImpl
import com.mohyeddin.accounter.domain.type.TypeRepository
import com.mohyeddin.accounter.domain.type.usecase.*
import org.koin.dsl.module
import retrofit2.Retrofit

val typeModule = module {
    includes(networkModule)

    single<StatisticService> {
        val retrofit : Retrofit = get()
        retrofit.create(StatisticService::class.java)
    }

    single<TypeRepository> {
        TypeRepositoryImpl(get())
    }

    single { GetTypesUseCase(get()) }

    single { GetTypeUseCase(get()) }

    single { EditTypeUseCase(get()) }

    single { DeleteTypeUseCase(get()) }

    single { AddTypeUseCase(get())}
}