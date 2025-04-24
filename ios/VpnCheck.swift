import Foundation
import NetworkExtension
import React
import Reachability

@objc(VpnCheck)
class VpnCheck: RCTEventEmitter {
    private var reachability: Reachability?

    override init() {
        super.init()
        setupReachability()
        NotificationCenter.default.addObserver(self, selector: #selector(vpnStatusDidChange), name: NSNotification.Name.NEVPNStatusDidChange, object: nil)
    }

    deinit {
        reachability?.stopNotifier()
        NotificationCenter.default.removeObserver(self)
    }

    private func setupReachability() {
        do {
            reachability = try Reachability()
            reachability?.whenReachable = { _ in
                self.sendEvent(withName: "vpnStatusChanged", body: ["status": self.checkVPNStatus()])
            }
            reachability?.whenUnreachable = { _ in
                self.sendEvent(withName: "vpnStatusChanged", body: ["status": self.checkVPNStatus()])
            }
            try reachability?.startNotifier()
        } catch {
            print("Unable to start Reachability notifier")
        }
    }

    @objc func vpnStatusDidChange(notification: Notification) {
        self.sendEvent(withName: "vpnStatusChanged", body: ["status": checkVPNStatus()])
    }

    @objc override func supportedEvents() -> [String] {
        return ["vpnStatusChanged"]
    }

    func checkVPNStatus() -> Bool {
        let cfDict = CFNetworkCopySystemProxySettings()
        let nsDict = cfDict?.takeRetainedValue() as NSDictionary?
        let keys = nsDict?["__SCOPED__"] as? NSDictionary

        for key in (keys?.allKeys as? [String] ?? []) {
            if key.contains("tap") || key.contains("tun") || key.contains("ppp") || key.contains("ipsec") || key.contains("utun") {
                return true
            }
        }
        return false
    }

    @objc(isVPNActive:rejecter:)
    func isVPNActive(_ resolve: @escaping RCTPromiseResolveBlock,
                     rejecter reject: @escaping RCTPromiseRejectBlock) {
        resolve(checkVPNStatus())
    }

    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
