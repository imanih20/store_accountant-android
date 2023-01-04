package com.mohyeddin.accounter.domain.transaction.useCase

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.transaction.TransactionRepository
import com.mohyeddin.accounter.domain.transaction.model.Transaction
import kotlinx.coroutines.flow.Flow

class GetAllTransactionsUseCase(private val repository: TransactionRepository) {
    suspend operator fun invoke() : Flow<BaseResult<List<Transaction>, WrappedListResponse<TransactionResponse>>>{
        return repository.getAllTransactions()
    }
}