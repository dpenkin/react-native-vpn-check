package com.vpncheck

import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = VpnCheckModule.NAME)
class VpnCheckModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "VpnCheck"

        @JvmStatic
        external fun nativeMultiply(a: Int, b: Int): Int
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun isVPNActive(promise: Promise) {
        val cm = reactContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val networks: Array<Network> =
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) cm.allNetworks else arrayOf()

        var isRunningVPN = false
        for (network in networks) {
            val caps: NetworkCapabilities? =
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    cm.getNetworkCapabilities(network)
                } else null

            if (caps != null &&
                (caps.hasTransport(NetworkCapabilities.TRANSPORT_VPN)
                        || !caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_NOT_VPN))
            ) {
                isRunningVPN = true
                break
            }
        }
        promise.resolve(isRunningVPN)
    }
}
