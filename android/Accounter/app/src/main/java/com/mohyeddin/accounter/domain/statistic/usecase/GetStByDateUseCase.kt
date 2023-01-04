package com.mohyeddin.accounter.domain.statistic.usecase

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.statistic.remote.dto.StatisticResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.statistic.StatisticRepository
import com.mohyeddin.accounter.domain.statistic.model.Statistic
import kotlinx.coroutines.flow.Flow

class GetStByDateUseCase(private val rep : StatisticRepository) {
    suspend operator fun invoke(year: Int, month: Int) : Flow<BaseResult<List<Statistic>,WrappedListResponse<StatisticResponse>>>{
        return rep.getStByDate(year,month)
    }
}