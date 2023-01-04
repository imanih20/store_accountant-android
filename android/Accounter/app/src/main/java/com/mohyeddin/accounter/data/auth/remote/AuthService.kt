package com.mohyeddin.accounter.data.auth.remote

import com.mohyeddin.accounter.data.auth.remote.dto.AuthResponse
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.user.remote.dto.UserResponse
import retrofit2.Response
import retrofit2.http.*

interface AuthService {

    @FormUrlEncoded
    @POST("auth/sign")
    suspend fun signUser(@Field("phone") phone: String) : Response<WrappedResponse<AuthResponse>>

    @FormUrlEncoded
    @POST("auth/verify")
    suspend fun verifyToken(
        @Field("smsToken") smsToken: String
    ): Response<WrappedResponse<UserResponse>>

}