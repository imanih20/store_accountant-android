package com.mohyeddin.accounter.data.user.utils

import com.mohyeddin.accounter.data.common.utils.ResultMaker
import com.mohyeddin.accounter.data.user.remote.dto.UserResponse
import com.mohyeddin.accounter.domain.user.model.User

class UserResult : ResultMaker<User, UserResponse>() {
    override fun getModel(res: UserResponse): User {
        return User(res.id,res.phone)
    }
}