package com.mohyeddin.accounter.data.type.remote.dto

import com.google.gson.annotations.SerializedName

data class TypeRequest(
    @SerializedName("title")val title: String
)
