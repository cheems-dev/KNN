const ms: any = require("modelscript/build/modelscript.cjs.js");
import { performance } from "perf_hooks";
import KNN_neighbours from "./functions/knn";
import { readCsv } from "./functions/readCsv";

/**
 * Funcion asincrona principal
 */
async function main(): Promise<void> {

  const file: Array<string> = ['test100', 'test500', 'test1000', 'test5000', 'test10000', 'test20000', 'test100000', 'test200000', 'test350000'];
  console.log("size, time");
  for (let i = 0; i < file.length; i++) {

    const csv = await readCsv(`./data/${file[i]}.csv`);
    // El total de datos divido en train "80%" y test "20%"
    // Obtenemos nuestros datos de train y test
    const data = ms.cross_validation.train_test_split(csv.data, {
      test_size: 0.2,
      random_state: 0.2,
    });
    const k = 2; // 2 vecinos mas cercanos de trainTest "datos de prueba"
    let start: number = performance.now();
    KNN_neighbours(data.train, data.test, k);
    let end: number = performance.now();
    console.log(`${file[i].slice(4)}, ${+(end - start).toFixed(4)}`);
  }
}


main();
