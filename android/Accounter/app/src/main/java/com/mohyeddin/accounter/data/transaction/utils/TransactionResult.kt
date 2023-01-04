package com.mohyeddin.accounter.data.transaction.utils

import com.mohyeddin.accounter.data.common.utils.ResultMaker
import com.mohyeddin.accounter.data.transaction.remote.dto.TransactionResponse
import com.mohyeddin.accounter.domain.transaction.model.Transaction

class TransactionResult : ResultMaker<Transaction,TransactionResponse>() {
    override fun getModel(res: TransactionResponse): Transaction {
        return Transaction(res.id,res.price,res.transactionType,res.year.toInt(),res.month.toInt(),res.day.toInt(),res.description)
    }
}
