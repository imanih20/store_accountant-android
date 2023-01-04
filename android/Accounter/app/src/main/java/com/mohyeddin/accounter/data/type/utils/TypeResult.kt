package com.mohyeddin.accounter.data.type.utils

import com.mohyeddin.accounter.data.common.utils.ResultMaker
import com.mohyeddin.accounter.data.type.remote.dto.TypeResponse
import com.mohyeddin.accounter.domain.type.model.Type

class TypeResult : ResultMaker<Type, TypeResponse>() {
    override fun getModel(res: TypeResponse): Type {
        return Type(res.id,res.title)
    }
}