import cheerio from 'react-native-cheerio';

const utils = {
  tmpData: [
    {
      name: "btc",
      price_usd: "-",
      price_rls: "-",
      icon: require('./assets/icons/btc.svg')
    },
    {
      name: "eth",
      price_usd: "-",
      price_rls: "-",
      icon: require('./assets/icons/eth.svg')
    },
    {
      name: "usdt",
      price_usd: "1",
      price_rls: "-",
      icon: require('./assets/icons/usdt.svg')
    },
    {
      name: "xrp",
      price_usd: "-",
      price_rls: "-",
      icon: require('./assets/icons/xrp.svg')
    },
    {
      name: "doge",
      price_usd: "-",
      price_rls: "-",
      icon: require('./assets/icons/doge.svg')
    },
    {
        name: "imami",
        price_usd: "",
        price_rls: "-",//+ "  |  " + "گرم طلا" + " IRT -",
        icon: require('./assets/icons/imami.svg')
    },
  ],
  formatCurrency: (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  getPriceData: async () => {
    try {

      //get crypto price from nobitex
      const res = await fetch('https://apiv2.nobitex.ir/market/stats', {
        method: 'GET',
        headers: {
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
        mode: "cors",
        credentials: "omit"
      });
      const data = await res.json();
      const preparedData = [...utils.tmpData];
      if (data?.status == 'ok') {
        //btc
        preparedData[0].price_usd = utils.formatCurrency(data.stats["btc-usdt"]?.mark).toString() || "-"
        preparedData[0].price_rls = utils.formatCurrency(data.stats["btc-rls"]?.bestSell / 10).toString() || "-"
        //eth
        preparedData[1].price_usd = utils.formatCurrency(data.stats["eth-usdt"]?.mark).toString() || "-"
        preparedData[1].price_rls = utils.formatCurrency(data.stats["eth-rls"]?.bestSell / 10).toString() || "-"
        //usdt
        preparedData[2].price_usd = "1"
        preparedData[2].price_rls = utils.formatCurrency(data.stats["usdt-rls"]?.bestSell / 10).toString() || "-"
        //xrp
        preparedData[3].price_usd = utils.formatCurrency(data.stats["xrp-usdt"]?.mark).toString() || "-"
        preparedData[3].price_rls = utils.formatCurrency(data.stats["xrp-rls"]?.bestSell / 10).toString() || "-"
        //doge
        preparedData[4].price_usd = utils.formatCurrency(data.stats["doge-usdt"]?.mark).toString() || "-"
        preparedData[4].price_rls = utils.formatCurrency(data.stats["doge-rls"]?.bestSell / 10).toString() || "-"
      }

      //get gold price from alanchand.com
      const res2 = await fetch('https://alanchand.com/gold-price', {
        method: 'GET',
        headers: {
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
        mode: "cors",
        credentials: "omit"
      });
      const data2 = await res2.text();
      // console.log(data2);
      const $ = await cheerio.load(data2, {
        // withDomLvl1: true,
        // normalizeWhitespace: false,
        // xmlMode: true,
        // decodeEntities: true
      });
      const results = [];
      $(".goldTbl tbody tr").each((_, row) => {
        const tds = $(row).find("td");

        const priceTd = $(tds[1]);
        // const bubbleTd = $(tds[3]);

        results.push({
          title: $(tds[0]).text().trim(),
          price: priceTd.clone().children().remove().end().text().trim(),
          // change: priceTd.find(".priceSymbol").text().trim(),
          // realPrice: $(tds[2]).text().trim(),
          // bubbleValue: bubbleTd.clone().children().remove().end().text().trim(),
          // bubblePercent: bubbleTd.find(".priceSymbol").text().trim(),
          // link: $(row).attr("onclick")?.match(/'([^']+)'/)?.[1]
        });
      });

      preparedData[5].price_rls = `${results[2]?.price} | گرم طلا ${results[1]?.price}` || "-"
      
      







      return preparedData;
    } catch (error) {
      console.log('Error: ', error);
      return null;
    }
  },
}

export default utils;