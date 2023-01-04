package com.mohyeddin.accounter.domain.type.usecase

import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.type.remote.dto.TypeRequest
import com.mohyeddin.accounter.data.type.remote.dto.TypeResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.type.TypeRepository
import com.mohyeddin.accounter.domain.type.model.Type
import kotlinx.coroutines.flow.Flow

class AddTypeUseCase(private val rep: TypeRepository) {
    suspend operator fun invoke(type: TypeRequest):Flow<BaseResult<Type,WrappedResponse<TypeResponse>>>{
        return rep.addType(type)
    }
}