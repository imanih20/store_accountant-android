package com.mohyeddin.accounter.data.transaction

import com.mohyeddin.accounter.data.common.modules.networkModule
import com.mohyeddin.accounter.data.transaction.remote.TransactionService
import com.mohyeddin.accounter.data.transaction.repository.TransactionRepositoryImpl
import com.mohyeddin.accounter.domain.transaction.TransactionRepository
import com.mohyeddin.accounter.domain.transaction.useCase.DeleteTransactionUseCase
import com.mohyeddin.accounter.domain.transaction.useCase.GetAllTransactionsUseCase
import com.mohyeddin.accounter.domain.transaction.useCase.GetWithTypeUseCase
import com.mohyeddin.accounter.domain.transaction.useCase.InsertTransactionUseCase
import org.koin.dsl.module
import retrofit2.Retrofit

val transactionModule = module {
    includes(networkModule)

    single<TransactionService> {
        val retrofit : Retrofit = get()
        retrofit.create(TransactionService::class.java)
    }

    single<TransactionRepository> {
        TransactionRepositoryImpl(get())
    }

    single {
        GetAllTransactionsUseCase(get())
    }

    single {
        InsertTransactionUseCase(get())
    }

    single {
        DeleteTransactionUseCase(get())
    }

    single {
        GetWithTypeUseCase(get())
    }
}