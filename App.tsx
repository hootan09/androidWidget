import * as React from "react";
import { AppState, StyleSheet, View } from "react-native";
import { WidgetPreview } from "react-native-android-widget";

import { StatusBar } from "expo-status-bar";
import { PriceWidget } from "./widget/PriceWidget";
import utils from "./utils";



export default function App() {

  const [priceList, setPriceList] = React.useState(utils.tmpData);

  const renderData = async () => {
    const res = await utils.getPriceData();
    if(res){
      setPriceList(res)
      setTimeout(async() => {
        await renderData()
      }, 30000);
    }
  }

  React.useEffect(() => {
    renderData();
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        renderData();
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <>
      <View style={[styles.container]}>
        <WidgetPreview
          renderWidget={() => <PriceWidget priceList={priceList}/>}
          width={320}
          height={200}
        />
      </View>
      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
