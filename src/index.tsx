import { NativeModules } from 'react-native';

const { VpnCheck } = NativeModules;

export function isVPNActive(): Promise<number> {
  return VpnCheck.isVPNActive();
}

export const VPNStatusChanged = VpnCheck;
