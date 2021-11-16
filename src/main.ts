const ms: any = require("modelscript/build/modelscript.cjs.js");
import KNN_neighbours from "./functions/knn";
import { readCsv } from "./functions/readCsv";

/**
 * Funcion asincrona principal
 */
async function main(): Promise<void> {
  const csv = await readCsv("./fruit.csv");

  // El total de datos es "69" antes de dividir en train"80%" y test "20%"
  // Obtenemos nuestros datos de train y test
  // test sera el 20% de nuestro dataset -> 20% de 69 es 11.8 = 12 datos
  // train sera los 47 datos de nuestro dataset
  const data = ms.cross_validation.train_test_split(csv.data, {
    test_size: 0.2,
    random_state: 0.2,
  });
  // ---------------------------------------------------------------------
  // console.log(data.test.length); // 20% de 69 es 11.8 = 12 datos
  // console.log(data.train.length); //                    47 datos 
  // ---------------------------------------------------------------------
  const k = 4; // 4 vecinos mas cercanos de trainTest "datos de prueba"
  console.log("Luis Alberto Ccalluchi Lopez");
  console.log("Algoritmo KNN-neighbours");
  console.log(`Train Data ${data.train.length}`);
  console.log(`Test Data ${data.test.length}`);

  KNN_neighbours(data.train, data.test, k);
}


main();
