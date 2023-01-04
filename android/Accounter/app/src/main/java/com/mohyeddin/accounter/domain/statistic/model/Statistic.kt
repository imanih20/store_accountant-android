package com.mohyeddin.accounter.domain.statistic.model

data class Statistic(
    val id: String,
    val type: String,
    val year: Int,
    val month: Int,
    val price: Int
)