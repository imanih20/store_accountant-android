package com.mohyeddin.accounter.data.transaction.remote.dto

import com.google.gson.annotations.SerializedName

data class TransactionRequest(
    @SerializedName("price") val price: Int,
    @SerializedName("year") val year: String,
    @SerializedName("month") val month: String,
    @SerializedName("day") val day: String,
    @SerializedName("transactionType") val transactionType: String,
    @SerializedName("description") val description: String = ""
)