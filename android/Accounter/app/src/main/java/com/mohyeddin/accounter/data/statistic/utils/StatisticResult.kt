package com.mohyeddin.accounter.data.statistic.utils

import com.mohyeddin.accounter.data.common.utils.ResultMaker
import com.mohyeddin.accounter.data.statistic.remote.dto.StatisticResponse
import com.mohyeddin.accounter.domain.statistic.model.Statistic

class StatisticResult : ResultMaker<Statistic, StatisticResponse>() {
    override fun getModel(res: StatisticResponse): Statistic {
        return Statistic(res.id,res.type,res.year.toInt(),res.month.toInt(),res.price)
    }
}