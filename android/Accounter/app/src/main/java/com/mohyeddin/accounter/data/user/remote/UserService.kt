package com.mohyeddin.accounter.data.user.remote

import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.user.remote.dto.UserResponse
import retrofit2.Response
import retrofit2.http.GET

interface UserService {
    @GET("users/me")
    suspend fun getMe() : Response<WrappedResponse<UserResponse>>
}