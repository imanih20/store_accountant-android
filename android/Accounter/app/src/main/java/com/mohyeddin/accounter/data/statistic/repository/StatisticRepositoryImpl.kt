package com.mohyeddin.accounter.data.statistic.repository

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.statistic.remote.StatisticService
import com.mohyeddin.accounter.data.statistic.remote.dto.StatisticResponse
import com.mohyeddin.accounter.data.statistic.utils.StatisticResult
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.statistic.StatisticRepository
import com.mohyeddin.accounter.domain.statistic.model.Statistic
import kotlinx.coroutines.flow.Flow

class StatisticRepositoryImpl(private val service: StatisticService) : StatisticRepository{
    private val result = StatisticResult()
    override suspend fun getStByDate(
        year: Int,
        month: Int
    ): Flow<BaseResult<List<Statistic>, WrappedListResponse<StatisticResponse>>> {
        val response = service.getStByDate(year.toString(), month.toString())
        return result.getListResult(response)
    }

    override suspend fun getStByType(type: String): Flow<BaseResult<List<Statistic>, WrappedListResponse<StatisticResponse>>> {
        val response = service.getStByType(type)
        return result.getListResult(response)
    }

    override suspend fun getStByDateAndType(
        type: String,
        year: Int,
        month: Int
    ): Flow<BaseResult<List<Statistic>, WrappedListResponse<StatisticResponse>>> {
        val response = service.getStByDateAndType(type,year.toString(),month.toString())
        return result.getListResult(response)
    }

}