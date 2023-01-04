package com.mohyeddin.accounter.data.auth

import com.mohyeddin.accounter.data.auth.remote.AuthService
import com.mohyeddin.accounter.data.auth.repository.AuthRepositoryImpl
import com.mohyeddin.accounter.data.common.modules.networkModule
import com.mohyeddin.accounter.domain.auth.AuthRepository
import com.mohyeddin.accounter.domain.auth.useCase.SignUserUseCase
import com.mohyeddin.accounter.domain.auth.useCase.VerifyTokenUseCase
import org.koin.dsl.module
import retrofit2.Retrofit
import retrofit2.create

val authModule = module {
    includes(networkModule)

    single<AuthService> {
        val retrofit : Retrofit = get()
        retrofit.create(AuthService::class.java)
    }

    single<AuthRepository> {
        AuthRepositoryImpl(get())
    }

    single {
        SignUserUseCase(get())
    }

    single{
        VerifyTokenUseCase(get())
    }
}