package com.mohyeddin.accounter.data.auth.utils

import com.mohyeddin.accounter.data.auth.remote.dto.AuthResponse
import com.mohyeddin.accounter.data.common.utils.ResultMaker
import com.mohyeddin.accounter.domain.auth.models.Auth

class AuthResult : ResultMaker<Auth,AuthResponse>() {
    override fun getModel(res: AuthResponse): Auth {
        return Auth(res.isSigned,res.token)
    }
}