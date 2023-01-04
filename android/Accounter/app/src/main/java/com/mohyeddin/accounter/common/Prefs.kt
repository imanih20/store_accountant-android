package com.mohyeddin.accounter.common

import android.content.Context
import android.content.SharedPreferences

class Prefs(context: Context){
    private val prefs: SharedPreferences = context.getSharedPreferences("myPrefs",Context.MODE_PRIVATE)
    fun writeToken(token: String){
        with(prefs.edit()){
            putString("token",token)
            apply()
        }
    }

    fun writeIsSigned(isSigned: Boolean){
        with(prefs.edit()){
            putBoolean("isSigned",isSigned)
            apply()
        }
    }

    fun getIsSigned() : Boolean {
        return prefs.getBoolean("isSigned",false)
    }

    fun getToken(): String? {
        return prefs.getString("token", "")
    }
}