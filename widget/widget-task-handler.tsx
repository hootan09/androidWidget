import { Linking } from "react-native";
import type {
  WidgetTaskHandlerProps,
} from "react-native-android-widget";
import { PriceWidget } from "./PriceWidget";
import utils from "../utils";


const nameToWidget = {
  Price: PriceWidget
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[
    widgetInfo.widgetName as keyof typeof nameToWidget
  ] as any;

  switch (props.widgetAction) {
    case "WIDGET_ADDED": {
      if (widgetInfo.widgetName === "Price") {
        const res = await utils?.getPriceData();
        props.renderWidget(
          <PriceWidget priceList={res}/>
        );
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }

      break;
    }
    case "WIDGET_UPDATE": {
      console.log('updated');
      if (widgetInfo.widgetName === "Price") {
        const res = await utils?.getPriceData();
        props.renderWidget(
          <PriceWidget priceList={res}/>
        );
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }

      break;
    }
    case "WIDGET_RESIZED": {
      if (widgetInfo.widgetName === "Price") {
        const res = await utils?.getPriceData();
        props.renderWidget(
          <PriceWidget priceList={res}/>
        );
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }
      break;
    }

    case "WIDGET_DELETED":
      // Not needed for now
      break;

    case "WIDGET_CLICK": {
      if (props.clickAction === "MY_ACTION") {
        // Linking.openURL("pricewidgetapp://home");
        const res = await utils?.getPriceData();
        props.renderWidget(
          <PriceWidget priceList={res}/>
        );
        break;
      }
      if (widgetInfo.widgetName === "Price") {
        const res = await utils?.getPriceData();
        props.renderWidget(
          <PriceWidget priceList={res}/>
        );
      }
      break;
    }
    default:
      break;
  }
}
