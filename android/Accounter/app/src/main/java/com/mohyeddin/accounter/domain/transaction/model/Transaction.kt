package com.mohyeddin.accounter.domain.transaction.model


data class Transaction(
    val id: String,
    val price: Int,
    val typeId: String,
    val year: Int,
    val month: Int,
    val day: Int,
    val description: String = "",
)
