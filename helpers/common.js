export function arrayFromLength(number) {
  return Array.from(new Array(number).keys()).map((k) => k * 72 + 1);
}

export function clean(obj) {
  obj.weight =
    Number(obj.weight.replace(/[\n\t\кг]/g, "").replace(",", ".")) * 1000 +
    "гр";

  for (let propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}
