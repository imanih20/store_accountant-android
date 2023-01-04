package com.mohyeddin.accounter.data.auth.remote.dto

import com.google.gson.annotations.SerializedName

data class AuthResponse(
    @SerializedName("isSigned")val isSigned: Boolean,
    @SerializedName("token") val token: String
)