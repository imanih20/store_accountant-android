package com.mohyeddin.accounter.data.auth.repository

import com.mohyeddin.accounter.data.auth.remote.dto.AuthResponse
import com.mohyeddin.accounter.data.auth.remote.AuthService
import com.mohyeddin.accounter.data.auth.utils.AuthResult
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.user.remote.dto.UserResponse
import com.mohyeddin.accounter.data.user.utils.UserResult
import com.mohyeddin.accounter.domain.auth.AuthRepository
import com.mohyeddin.accounter.domain.auth.models.Auth
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.user.model.User
import kotlinx.coroutines.flow.Flow
import org.koin.core.component.KoinComponent
import org.koin.core.component.inject

class AuthRepositoryImpl(private val authService: AuthService) : AuthRepository{
    override suspend fun signIn(phone: String): Flow<BaseResult<Auth, WrappedResponse<AuthResponse>>> {
        val response = authService.signUser(phone)
        return AuthResult().getResult(response)
    }

    override suspend fun verifyToken(smsToken: String): Flow<BaseResult<User, WrappedResponse<UserResponse>>> {
        val response = authService.verifyToken(smsToken)
        return UserResult().getResult(response)
    }

}