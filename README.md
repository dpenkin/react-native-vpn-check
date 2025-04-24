# react-native-vpn-check

Get current VPN status

## Getting started

`$ npm install react-native-vpn-check --save`

or 

`$ yarn add react-native-vpn-check`

and 

`$ cd ios && pod install`


## Usage
```javascript
import { isVPNActive } from 'react-native-vpn-check';

* Example classic

async function getStatusVPN() {
    const isStatus = await isVPNActive();
}

getStatusVPN();

* Example Seamless transition to splash screen with vpn status

Create your own custom splash screen identical to the application and add the status to the desired location
Example of a splash screen in example/src/SplashScreen.tsx

  const [showCustomSplashScreen, setShowCustomSplashScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen?.hide();
    }, 3000);
  }, []);

  if (showCustomSplashScreen) {
    return <CustomSplashScreen />;
  }

```
<img src="https://github.com/dpenkin/react-native-vpn-check/blob/main/example.gif">
```swift
for ios AppDelegate.swift needs to be improved

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {

    // 👇 Let's call super first (if you inherit from UIResponder, you can skip it - but leave it as specified)
    let didLaunchFinish = true

    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "VpnCheckExample",
      in: window,
      launchOptions: launchOptions
    )

    RNSplashScreen.show()  // 👈 Show splash screen after launch

    return didLaunchFinish
  }

  Don't forget to add <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" /> for android in AndroidManifest.xml

```
