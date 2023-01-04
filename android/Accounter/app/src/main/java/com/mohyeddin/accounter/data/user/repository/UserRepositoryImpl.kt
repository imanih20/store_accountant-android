package com.mohyeddin.accounter.data.user.repository

import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.user.remote.UserService
import com.mohyeddin.accounter.data.user.remote.dto.UserResponse
import com.mohyeddin.accounter.data.user.utils.UserResult
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.user.UserRepository
import com.mohyeddin.accounter.domain.user.model.User
import kotlinx.coroutines.flow.Flow

class UserRepositoryImpl(private val userService: UserService) : UserRepository {
    override suspend fun getMe(): Flow<BaseResult<User, WrappedResponse<UserResponse>>> {
        val response = userService.getMe()
        return UserResult().getResult(response)
    }

}