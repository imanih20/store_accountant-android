package com.mohyeddin.accounter.domain.auth.useCase

import com.mohyeddin.accounter.data.auth.remote.dto.AuthResponse
import com.mohyeddin.accounter.data.common.utils.WrappedResponse
import com.mohyeddin.accounter.domain.auth.AuthRepository
import com.mohyeddin.accounter.domain.auth.models.Auth
import com.mohyeddin.accounter.domain.common.base.BaseResult
import kotlinx.coroutines.flow.Flow

class SignUserUseCase (private val repository: AuthRepository){
    suspend operator fun invoke(phone: String) : Flow<BaseResult<Auth, WrappedResponse<AuthResponse>>>{
        return repository.signIn(phone)
    }
}