package com.mohyeddin.accounter.data.user.remote.dto

import com.google.gson.annotations.SerializedName

data class UserResponse(
    @SerializedName("_id") val id: String,
    @SerializedName("phone") val phone: String
)