package com.mohyeddin.accounter.domain.type

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.type.remote.dto.TypeRequest
import com.mohyeddin.accounter.data.type.remote.dto.TypeResponse
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.type.model.Type
import kotlinx.coroutines.flow.Flow

interface TypeRepository {
    suspend fun getTypes() : Flow<BaseResult<List<Type>,WrappedListResponse<TypeResponse>>>

    suspend fun getType(id: String) : Flow<BaseResult<Type,WrappedResponse<TypeResponse>>>

    suspend fun editType(id: String,type: TypeRequest) : Flow<BaseResult<Type,WrappedResponse<TypeResponse>>>

    suspend fun addType(type: TypeRequest) : Flow<BaseResult<Type,WrappedResponse<TypeResponse>>>

    suspend fun deleteType(id: String) : Flow<BaseResult<Type,WrappedResponse<TypeResponse>>>
}