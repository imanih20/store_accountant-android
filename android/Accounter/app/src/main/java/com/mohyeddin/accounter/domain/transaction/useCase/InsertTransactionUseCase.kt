package com.mohyeddin.accounter.domain.transaction.useCase


import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionRequest
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.transaction.TransactionRepository
import com.mohyeddin.accounter.domain.transaction.model.Transaction
import kotlinx.coroutines.flow.Flow

class InsertTransactionUseCase(private val repository: TransactionRepository) {
    suspend operator fun invoke(transaction: TransactionRequest) : Flow<BaseResult<Transaction, WrappedResponse<TransactionResponse>>>{
        return repository.insertTransaction(transaction)
    }
}