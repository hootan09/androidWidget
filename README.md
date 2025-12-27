### Android Widget App

### Installation

```bash
# Install dependencies
npm install

# Build and run on Android
npx expo run:android
```

### Adding the Widget

1. Build and install the app on your Android device/emulator
2. Long-press on your home screen
3. Select "Widgets"
4. Find "My Price Widget" and drag it to your home screen
5. Configure the background color (optional)

## Widget Configuration


## Widget Events

The task handler responds to these events:

| Event            | Description                        |
| ---------------- | ---------------------------------- |
| `WIDGET_ADDED`   | Widget placed on home screen       |
| `WIDGET_UPDATE`  | Periodic or manual refresh         |
| `WIDGET_RESIZED` | User resized the widget            |
| `WIDGET_DELETED` | Widget removed from home screen    |
| `WIDGET_CLICK`   | User tapped an interactive element |


## Learn More

- [React Native Android Widget Docs](https://saleksovski.github.io/react-native-android-widget/)
- [Expo Documentation](https://docs.expo.dev/)
- [Android App Widgets Guide](https://developer.android.com/develop/ui/views/appwidgets)



![widget view](/assets/widget-preview/hello.png)


### Build android app

```sh
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```


##### Open android/gradle.properties file and add the following gradle variables at the end of the file. Replace the ***** with the correct keystore and key password that you provided in the previous step.

```txt
# If you've downloaded the credentials from `eas credentials` command, see comments below for each value.

MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore     # Path to the "keystore" file
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias                # Replace with value of the `keystore.keyAlias` field in the credentials.json file
MYAPP_UPLOAD_STORE_PASSWORD=*****                  # Replace with value of the `keystore.password` field in the credentials.json file
MYAPP_UPLOAD_KEY_PASSWORD=*****                    # Replace with value of the `keystore.keyPassword` field in the credentials.json file

```

##### Open android/app/build.gradle file and add the following configuration:

```txt
 keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        <!-- release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        } -->
    }
    buildTypes {







            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            <!-- signingConfig signingConfigs.release -->
            shrinkResources 
```

```sh
cd android && ./gradlew app:bundleRelease

gradlew assembleRelease
```