package com.mohyeddin.accounter.domain.auth.models

data class Auth(
    val isSigned: Boolean,
    val token: String
)
