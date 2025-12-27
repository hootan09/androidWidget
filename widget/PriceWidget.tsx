/* eslint-disable react-native/no-inline-styles */
import {
    FlexWidget,
    TextWidget,
    ImageWidget,
    SvgWidget,
} from "react-native-android-widget";
import utils from "../utils";

const iconSize = 24;

export function PriceWidget({priceList = utils.tmpData}:any) {
    return (

        <FlexWidget
            style={{
                height: "match_parent",
                width: "match_parent",
                backgroundColor: '#FFF',
                borderRadius: 24,
                padding: 12,
                flexDirection: "column",
            }}
            clickAction="MY_ACTION"
        >
            {priceList?.map((item:any, index:number) => (
                <FlexWidget
                    key={index}
                    style={{
                        width: "match_parent",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        height: "wrap_content",
                        marginTop: index > 0 ? 5 : 0,
                        // backgroundColor: '#AAA'
                    }}
                >
                    <SvgWidget
                        svg={item.icon}
                        style={{ height: iconSize, width: iconSize }}
                    />
                    <TextWidget
                        text={`${item?.price_usd && '$' + item.price_usd + '  |'}  IRT ${item.price_rls}`}
                        style={{
                            fontSize: 12,
                            color: "#000",
                            fontWeight: "600",
                            marginLeft: 8,
                        }}
                    />
                </FlexWidget>

            ))}

        </FlexWidget>
    );
}
