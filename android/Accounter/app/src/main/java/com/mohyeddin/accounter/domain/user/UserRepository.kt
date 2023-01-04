package com.mohyeddin.accounter.domain.user

import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.user.remote.dto.UserResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.user.model.User
import kotlinx.coroutines.flow.Flow

interface UserRepository {
    suspend fun getMe() : Flow<BaseResult<User, WrappedResponse<UserResponse>>>
}