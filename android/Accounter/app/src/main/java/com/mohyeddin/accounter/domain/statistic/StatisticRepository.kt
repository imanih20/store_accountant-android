package com.mohyeddin.accounter.domain.statistic

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.statistic.remote.dto.StatisticResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.statistic.model.Statistic
import kotlinx.coroutines.flow.Flow

interface StatisticRepository {
    suspend fun getStByDate(year: Int,month: Int) : Flow<BaseResult<List<Statistic>,WrappedListResponse<StatisticResponse>>>

    suspend fun getStByType(type: String) : Flow<BaseResult<List<Statistic>,WrappedListResponse<StatisticResponse>>>

    suspend fun getStByDateAndType(type: String,year: Int, month: Int) : Flow<BaseResult<List<Statistic>,WrappedListResponse<StatisticResponse>>>
}