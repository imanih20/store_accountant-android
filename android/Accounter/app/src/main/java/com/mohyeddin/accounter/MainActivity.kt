package com.mohyeddin.accounter

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.mohyeddin.accounter.ui.theme.AccounterTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AccounterTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MainScreen()
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(){

    Scaffold(
        bottomBar ={
           BottomAppBar(
               floatingActionButton = {
                   FloatingActionButton(
                       onClick = {  },
                       elevation = FloatingActionButtonDefaults.bottomAppBarFabElevation(),
                       containerColor = BottomAppBarDefaults.bottomAppBarFabColor
                   ) {
                       Icon(Icons.Default.Add, contentDescription = "")
                   }
               },
               actions = {
                   IconButton(onClick = { /*TODO*/ }) {
                       Icon(Icons.Default.Person, contentDescription = "")
                   }
                   IconButton(onClick = { /*TODO*/ }) {
                       Icon(Icons.Default.Home, contentDescription = "" )
                   }

               }
           )
        },
    ) {pv->
        Column(Modifier.padding(pv)) {

        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    AccounterTheme {
        MainScreen()
    }
}