package com.mohyeddin.accounter.data.type.remote

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.type.remote.dto.TypeRequest
import com.mohyeddin.accounter.data.type.remote.dto.TypeResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface TypeService {
    @GET("type/")
    suspend fun getAllTypes() : Response<WrappedListResponse<TypeResponse>>

    @GET("type/{id}")
    suspend fun getType(@Path("id")id : String) : Response<WrappedResponse<TypeResponse>>

    @POST("type/")
    suspend fun addType(@Body type: TypeRequest) : Response<WrappedResponse<TypeResponse>>

    @PUT("type/{id}")
    suspend fun editType(@Path("id") id : String, @Body type: TypeRequest) : Response<WrappedResponse<TypeResponse>>

    @DELETE("type/{id}")
    suspend fun deleteType(@Path("id")id: String) : Response<WrappedResponse<TypeResponse>>
}