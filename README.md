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