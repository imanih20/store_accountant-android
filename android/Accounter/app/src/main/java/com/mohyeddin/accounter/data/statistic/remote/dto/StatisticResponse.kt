package com.mohyeddin.accounter.data.statistic.remote.dto

import com.google.gson.annotations.SerializedName

data class StatisticResponse(
    @SerializedName("_id") val id : String,
    @SerializedName("type") val type: String,
    @SerializedName("year") val year: String,
    @SerializedName("month") val month: String,
    @SerializedName("price") val price: Int
)