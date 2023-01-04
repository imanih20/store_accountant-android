package com.mohyeddin.accounter.domain.type.usecase

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.type.remote.dto.TypeResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.type.TypeRepository
import com.mohyeddin.accounter.domain.type.model.Type
import kotlinx.coroutines.flow.Flow

class GetTypesUseCase(private val rep: TypeRepository) {
    suspend operator fun invoke(): Flow<BaseResult<List<Type>,WrappedListResponse<TypeResponse>>>{
        return rep.getTypes()
    }
}