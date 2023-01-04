package com.mohyeddin.accounter.data.type.remote.dto

import com.google.gson.annotations.SerializedName

data class TypeResponse(
    @SerializedName("_id") val id : String,
    @SerializedName("title") val title: String
)