package com.mohyeddin.accounter.domain.transaction

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionRequest
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.transaction.model.Transaction
import kotlinx.coroutines.flow.Flow

interface TransactionRepository {
    suspend fun getAllTransactions() : Flow<BaseResult<List<Transaction>, WrappedListResponse<TransactionResponse>>>

    suspend fun insertTransaction(transaction: TransactionRequest) : Flow<BaseResult<Transaction, WrappedResponse<TransactionResponse>>>

    suspend fun deleteTransaction(id: String) : Flow<BaseResult<Transaction, WrappedResponse<TransactionResponse>>>

    suspend fun getTransactionWithType(typeId: String) : Flow<BaseResult<List<Transaction>,WrappedListResponse<TransactionResponse>>>
}