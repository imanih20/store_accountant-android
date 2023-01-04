package com.mohyeddin.accounter.data.transaction.repository

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.transaction.remote.TransactionService
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionRequest
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionResponse
import com.mohyeddin.accounter.data.transaction.utils.TransactionResult
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.transaction.TransactionRepository
import com.mohyeddin.accounter.domain.transaction.model.Transaction
import kotlinx.coroutines.flow.Flow

class TransactionRepositoryImpl(private val transactionService: TransactionService) : TransactionRepository {
    private val result : TransactionResult = TransactionResult()
    override suspend fun getAllTransactions(): Flow<BaseResult<List<Transaction>, WrappedListResponse<TransactionResponse>>> {
        val response = transactionService.getAllTransactions()
        return result.getListResult(response)
    }

    override suspend fun insertTransaction(transaction: TransactionRequest): Flow<BaseResult<Transaction, WrappedResponse<TransactionResponse>>> {
        val response = transactionService.addTransaction(transaction)
        return result.getResult(response)
    }

    override suspend fun deleteTransaction(id: String): Flow<BaseResult<Transaction, WrappedResponse<TransactionResponse>>> {
        val response = transactionService.deleteTransaction(id)
        return result.getResult(response)
    }

    override suspend fun getTransactionWithType(typeId: String): Flow<BaseResult<List<Transaction>, WrappedListResponse<TransactionResponse>>> {
        val response = transactionService.getTransactionsWithType(typeId)
        return result.getListResult(response)
    }

}