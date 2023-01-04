package com.mohyeddin.accounter.data.transaction.remote

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionRequest
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionResponse
import retrofit2.Response
import retrofit2.http.*

interface TransactionService {

    @GET("transactions/")
    suspend fun getAllTransactions() : Response<WrappedListResponse<TransactionResponse>>

    @POST("transactions/")
    suspend fun addTransaction(@Body transaction: TransactionRequest) : Response<WrappedResponse<TransactionResponse>>

    @DELETE("transactions/{id}")
    suspend fun deleteTransaction(@Path("id") id: String) : Response<WrappedResponse<TransactionResponse>>

    @GET("transactions/{typeId}")
    suspend fun getTransactionsWithType(@Path("typeId") typeId: String) : Response<WrappedListResponse<TransactionResponse>>
}