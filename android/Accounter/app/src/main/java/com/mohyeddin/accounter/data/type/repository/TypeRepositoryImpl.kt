package com.mohyeddin.accounter.data.type.repository

import com.mohyeddin.accounter.data.common.utils.WrappedListResponse
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.data.type.remote.TypeService
import com.mohyeddin.accounter.data.type.remote.dto.TypeRequest
import com.mohyeddin.accounter.data.type.remote.dto.TypeResponse
import com.mohyeddin.accounter.data.type.utils.TypeResult
import com.mohyeddin.accounter.domain.common.base.BaseResult
import com.mohyeddin.accounter.domain.type.TypeRepository
import com.mohyeddin.accounter.domain.type.model.Type
import kotlinx.coroutines.flow.Flow

class TypeRepositoryImpl(private val service: TypeService) : TypeRepository {
    private val result = TypeResult()
    override suspend fun getTypes(): Flow<BaseResult<List<Type>, WrappedListResponse<TypeResponse>>> {
        val response = service.getAllTypes()
        return result.getListResult(response)
    }

    override suspend fun getType(id: String): Flow<BaseResult<Type, WrappedResponse<TypeResponse>>> {
        val response = service.getType(id)
        return result.getResult(response)
    }

    override suspend fun editType(
        id: String,
        type: TypeRequest
    ): Flow<BaseResult<Type, WrappedResponse<TypeResponse>>> {
        val response = service.editType(id,type)
        return result.getResult(response)
    }

    override suspend fun addType(type: TypeRequest): Flow<BaseResult<Type, WrappedResponse<TypeResponse>>> {
        val response = service.addType(type)
        return result.getResult(response)
    }

    override suspend fun deleteType(id: String): Flow<BaseResult<Type, WrappedResponse<TypeResponse>>> {
        val response = service.deleteType(id)
        return result.getResult(response)
    }
}