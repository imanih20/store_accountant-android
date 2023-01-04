package com.mohyeddin.accounter.data.user

import com.mohyeddin.accounter.data.common.modules.networkModule
import com.mohyeddin.accounter.data.user.remote.UserService
import com.mohyeddin.accounter.data.user.repository.UserRepositoryImpl
import com.mohyeddin.accounter.domain.user.UserRepository
import com.mohyeddin.accounter.domain.user.useCase.GetMeUseCase
import org.koin.dsl.module
import retrofit2.Retrofit

val userModule = module {
    includes(networkModule)

    single <UserService>{
        val retrofit : Retrofit = get()
        retrofit.create(UserService::class.java)
    }

    single <UserRepository>{
        UserRepositoryImpl(get())
    }

    single {
        GetMeUseCase(get())
    }
}