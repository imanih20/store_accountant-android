package com.mohyeddin.accounter.domain.user.useCase

import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.user.remote.dto.UserResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.user.UserRepository
import com.mohyeddin.accounter.domain.user.model.User
import kotlinx.coroutines.flow.Flow

class GetMeUseCase(private val userRepository: UserRepository) {
    suspend operator fun invoke() : Flow<BaseResult<User, WrappedResponse<UserResponse>>>{
        return userRepository.getMe()
    }
}