package com.mohyeddin.accounter.data.common.utils

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.mohyeddin.accounter.domain.common.base.BaseResult
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.Response

abstract class ResultMaker<T : Any,U : Any>() {
    fun getResult(response: Response<WrappedResponse<U>>) : Flow<BaseResult<T, WrappedResponse<U>>> {
        return flow {
            if (response.isSuccessful){
                val body = response.body()
                val model = body?.data?.let {
                    getModel(it)
                }
                emit(BaseResult.Success(model!!))
            } else {
                val err = getWrappedResponse(response)
                emit(BaseResult.Error(err))
            }
        }
    }

    fun getListResult(response: Response<WrappedListResponse<U>>) : Flow<BaseResult<List<T>, WrappedListResponse<U>>> {
        return flow {
            if (response.isSuccessful){
                val body = response.body()
                val modelList = mutableListOf<T>()
                body?.data?.forEach{
                    modelList.add(getModel(it))
                }
                emit(BaseResult.Success(modelList))
            } else {
                val err = getWrappedListResponse(response)
                emit(BaseResult.Error(err))
            }
        }
    }

    protected abstract fun getModel(res: U) : T

    private fun getWrappedResponse(response: Response<WrappedResponse<U>>): WrappedResponse<U> {
        val type = object : TypeToken<WrappedResponse<U>>(){}.type
        val err = Gson().fromJson<WrappedResponse<U>>(response.errorBody()!!.charStream(), type)!!
        err.code = response.code()
        return err
    }

    private fun getWrappedListResponse(response: Response<WrappedListResponse<U>>): WrappedListResponse<U> {
        val type = object : TypeToken<WrappedListResponse<U>>(){}.type
        val err = Gson().fromJson<WrappedListResponse<U>>(response.errorBody()!!.charStream(), type)!!
        err.code = response.code()
        return err
    }
}