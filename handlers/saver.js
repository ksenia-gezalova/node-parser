import fs from "fs";

export default async function saveData(array) {
  let data = {};
  data.table = array;

  fs.writeFile("data.json", JSON.stringify(data), (err) => {
    if (err) console.log(err);
  });
}
