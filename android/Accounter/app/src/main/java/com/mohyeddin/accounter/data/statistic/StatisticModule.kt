package com.mohyeddin.accounter.data.statistic

import com.mohyeddin.accounter.data.common.modules.networkModule
import com.mohyeddin.accounter.data.statistic.remote.StatisticService
import com.mohyeddin.accounter.data.statistic.repository.StatisticRepositoryImpl
import com.mohyeddin.accounter.domain.statistic.StatisticRepository
import com.mohyeddin.accounter.domain.statistic.usecase.GetStByDateAndTypeUseCase
import com.mohyeddin.accounter.domain.statistic.usecase.GetStByDateUseCase
import com.mohyeddin.accounter.domain.statistic.usecase.GetStByTypeUseCase
import org.koin.dsl.module
import retrofit2.Retrofit

val statisticModule = module {
    includes(networkModule)

    single<StatisticService> {
        val retrofit : Retrofit = get()
        retrofit.create(StatisticService::class.java)
    }

    single<StatisticRepository> {
        StatisticRepositoryImpl(get())
    }

    single { GetStByDateUseCase(get()) }

    single { GetStByDateAndTypeUseCase(get()) }

    single { GetStByTypeUseCase(get()) }
}