package com.mohyeddin.accounter.domain.auth

import com.mohyeddin.accounter.data.auth.remote.dto.AuthResponse
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.user.remote.dto.UserResponse
import com.mohyeddin.accounter.domain.auth.models.Auth
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.user.model.User
import kotlinx.coroutines.flow.Flow

interface AuthRepository {
    suspend fun signIn(phone: String) : Flow<BaseResult<Auth, WrappedResponse<AuthResponse>>>

    suspend fun verifyToken(smsToken: String) : Flow<BaseResult<User, WrappedResponse<UserResponse>>>
}