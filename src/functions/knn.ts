import { IDataPoints } from "../interfaces/DataPoints.interface";
import { IEuclidian } from "../interfaces/Index.interface";
import distanceEuclidian from "./distanceEuclidian";

/**
 * Algoritmo KNN
 * @param train_data Datasets de entrenamiento
 * @param test_data Datasets de prueba
 * @param k Numero de vecinos cercanos
 */
export default function KNN_neighbours(train_data: Array<IDataPoints>, test_data: Array<IDataPoints>, k: number): void {
  // Iteramos sobre nuestro datasets de test
  test_data.forEach((point: IDataPoints) => {
    KNN(train_data, point, k);
  });
}

/**
 * 
 * @param train Datasets de entrenamiento
 * @param test Dato de prueba para encontrar los KNN
 * @param k Numero de vecinos cercanos
 */
function KNN(train: Array<IDataPoints>, test: IDataPoints, k: number): void {
  let compareXY: Array<IEuclidian> = [];
  let compareXZ: Array<IEuclidian> = [];
  let compareYZ: Array<IEuclidian> = [];


  for (let i = 0; i < train.length; i++) {
    // X vs Y
    compareXY.push({ distance: distanceEuclidian(train[i].x, test.x, train[i].y, test.y), index: i });
    // X vs Z
    compareXZ.push({ distance: distanceEuclidian(train[i].x, test.x, train[i].z, test.z), index: i });
    // Y vs Z
    compareYZ.push({ distance: distanceEuclidian(train[i].x, test.x, train[i].z, test.z), index: i });
  }

  // sort por distancia de manera ascendete
  compareXY.sort(function (a, b) {
    return a.distance - b.distance;
  });
  compareXZ.sort(function (a, b) {
    return a.distance - b.distance;
  });
  compareYZ.sort(function (a, b) {
    return a.distance - b.distance;
  });

  // dividir nuestro arreglo ordenado de distancias "posicion 0 a k"
  compareXY = compareXY.slice(0, k);
  compareXZ = compareXZ.slice(0, k);
  compareYZ = compareYZ.slice(0, k);
  /*  console.log("----------------------------------------------------------------------------");
   console.log("\t\t\tX vs Y");
   prediction(train, test, compareXY, k);
   console.log("----------------------------------------------------------------------------");
   console.log("\t\t\tX vs Z");
   prediction(train, test, compareXZ, k);
   console.log("----------------------------------------------------------------------------");
   console.log("\t\t\tY vs Z");
   prediction(train, test, compareYZ, k);
   console.log("----------------------------------------------------------------------------"); */
}

function prediction(train: Array<IDataPoints>, test: IDataPoints, distances: Array<IEuclidian>, k: number): void {
  console.log(`       x                             y                          z`);
  console.log(`${test.x}       ${test.y}        ${test.z}       `);
  console.log('---------------------');
  console.log(`K = ${k} neighbours`);
  console.log('---------------------');
  console.log(`\tx\t\t\t\ty\t\t\tz\t\tdistancia`);
  /* let [x_account, y_account, z_account] = [0, 0, 0]; */
  distances.forEach((data) => {
    const { distance, index } = data;
    console.log(`${train[index].x}      ${train[index].y}      ${train[index].z}    ${distance}`);
    // clase estimada -> no podemos aplicar la funcion predecir porque no se tiene un label especifico para este proceso
    /*  (train[index].x === test.x) ? x_account += 1 : x_account;
     (train[index].y === test.y) ? y_account += 1 : y_account;
     (train[index].z === test.z) ? z_account += 1 : z_account; */

  });

  /* console.log(`Prediccion: ${(100 * accerts) / k}%`); */

  /*   predictionClass(x_account, y_account, z_account); */
}

/**
 * Predecir la clase segun los k vecinos
 * @param x contador de la clase x
 * @param y contador de la clase y
 * @param z contador de la clase z
 */
function predictionClass(x: number, y: number, z: number): void {
  const prediction_class = Math.max(x, y, z);
  console.log("Clase esperada: ");
  if (prediction_class === x)
    console.log("\t\t[x]Clase X");
  else if (prediction_class === y)
    console.log("\t\t[x]Clase Y");
  else if (prediction_class === z)
    console.log("\t\t[x]Clase Z");

}
