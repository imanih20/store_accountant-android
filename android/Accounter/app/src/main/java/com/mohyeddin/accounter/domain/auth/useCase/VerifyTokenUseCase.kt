package com.mohyeddin.accounter.domain.auth.useCase

import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.user.remote.dto.UserResponse
import com.mohyeddin.accounter.domain.auth.AuthRepository
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.user.model.User
import kotlinx.coroutines.flow.Flow

class VerifyTokenUseCase(private val authRepository: AuthRepository) {
    suspend operator fun invoke(smsToken: String) : Flow<BaseResult<User, WrappedResponse<UserResponse>>> {
        return authRepository.verifyToken(smsToken)
    }
}