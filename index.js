import cheerio from "cheerio";

import saver from "./handlers/saver.js";
import { arrayFromLength, clean } from "./helpers/common.js";
import { getPageContent } from "./helpers/puppeteer.js";

const SITE =
  "https://www.okeydostavka.ru/spb/bakaleia-i-konservatsiia/konservatsiia/ovoshchnaia-i-gribnaia-konservatsiia#face&productBeginIndex:";

const totalPages = 4;

(async function main() {
  try {
    const productItems = [];

    for (const productBeginIndex of arrayFromLength(totalPages)) {
      const url = `${SITE}${productBeginIndex}`;
      const pageContent = await getPageContent(url);

      const $ = cheerio.load(pageContent);

      $(".product").each((i, card) => {
        let discountPrice = null;
        let price = null;

        const title = $(card).find(".product-name").find("a").text();
        const weight = $(card).find(".product-weight").text();
        const discount = $(card).find(".special-discount").find("span").text();

        if (discount !== "") {
          discountPrice = $(card).find(".product-price").find("input").val();
          price = $(card).find(".product-price").find(".crossed").text();
          price = price.substring(0, price.indexOf("₽")) + "₽";
        } else {
          price = $(card).find(".product-price").find("input").val();
        }

        let item = {
          position: i + 1,
          title,
          weight,
          price,
          discountPrice,
        };

        clean(item);

        productItems.push(item);

        saver(productItems);
      });
    }
  } catch (err) {
    console.log(err);
  }
})();
