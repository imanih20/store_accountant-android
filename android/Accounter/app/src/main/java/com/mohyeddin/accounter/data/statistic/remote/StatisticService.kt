package com.mohyeddin.accounter.data.statistic.remote

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.statistic.remote.dto.StatisticResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface StatisticService {
    @GET("statistic/{year}/{month}")
    suspend fun getStByDate(@Path("year")year: String, @Path("month")month: String) : Response<WrappedListResponse<StatisticResponse>>

    @GET("statistic/{typeId}")
    suspend fun getStByType(@Path("typeId")type: String) : Response<WrappedListResponse<StatisticResponse>>

    @GET("statistic/{typeId}/{year}/{month}")
    suspend fun getStByDateAndType(@Path("typeId")type: String,@Path("year")year: String, @Path("month")month: String) : Response<WrappedListResponse<StatisticResponse>>
}