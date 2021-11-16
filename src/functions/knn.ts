import { IFruit } from "../interfaces/Fruit.interface";
import { IEuclidian } from "../interfaces/Index.interface";
import distanceEuclidian from "./distanceEuclidian";

/**
 * Algoritmo KNN
 * @param train_data Datasets de entrenamiento
 * @param test_data Datasets de prueba
 * @param k Numero de vecinos cercanos
 */
export default function KNN_neighbours(train_data: Array<IFruit>, test_data: Array<IFruit>, k: number): void {
  // Iteramos sobre nuestro datasets de test
  test_data.forEach((fruit: IFruit) => {
    KNN(train_data, fruit, k);
  });
}

/**
 * 
 * @param train Datasets de entrenamiento
 * @param test Dato de prueba para encontrar los KNN
 * @param k Numero de vecinos cercanos
 */
function KNN(train: Array<IFruit>, test: IFruit, k: number): void {
  // mass vs width
  let mass_width: Array<IEuclidian> = [];
  // mass vs height
  let mass_height: Array<IEuclidian> = [];
  // mass vs color_score
  let mass_colorScore: Array<IEuclidian> = [];
  // width vs height
  let width_height: Array<IEuclidian> = [];
  // width vs color_score
  let width_colorScore: Array<IEuclidian> = [];
  // height vs  color_score
  let height_colorScore: Array<IEuclidian> = [];
  // Iteramos sobre nuestro datasets de train y comenzamos hallar la distancia euclidiana probando nuestro dato de test
  for (let i = 0; i < train.length; i++) {
    // mass vs width
    mass_width.push({ distance: distanceEuclidian(train[i].mass, test.mass, train[i].width, test.width), index: i });
    // mass vs height
    mass_height.push({ distance: distanceEuclidian(train[i].mass, test.mass, train[i].height, test.height), index: i });
    // mass vs color_score
    mass_colorScore.push({ distance: distanceEuclidian(train[i].mass, test.mass, train[i].color_score, test.color_score), index: i });
    // width vs height
    width_height.push({
      distance: distanceEuclidian(train[i].width, test.width, train[i].height, test.height), index: i
    });
    // width vs color_score
    width_colorScore.push({
      distance: distanceEuclidian(train[i].width, test.width, train[i].color_score, test.color_score), index: i
    });
    // height vs  color_score
    height_colorScore.push({
      distance: distanceEuclidian(train[i].height, test.height, train[i].color_score, test.color_score), index: i
    });
  }

  // sort por distancia de manera ascendete
  mass_width.sort(function (a, b) {
    return a.distance - b.distance;
  });
  mass_height.sort(function (a, b) {
    return a.distance - b.distance;
  });
  mass_colorScore.sort(function (a, b) {
    return a.distance - b.distance;
  });
  width_height.sort(function (a, b) {
    return a.distance - b.distance;
  });
  width_colorScore.sort(function (a, b) {
    return a.distance - b.distance;
  });
  height_colorScore.sort(function (a, b) {
    return a.distance - b.distance;
  });

  // dividir nuestro arreglo ordenado de distancias "posicion 0 a k"
  mass_width = mass_width.slice(0, k);
  mass_height = mass_height.slice(0, k);
  mass_colorScore = mass_colorScore.slice(0, k);
  width_height = width_height.slice(0, k);
  width_colorScore = width_colorScore.slice(0, k);
  height_colorScore = height_colorScore.slice(0, k);
  console.log("----------------------------------------------------------------------------");
  console.log("\t\t\tMASS vs WIDTH");
  prediction(train, test, mass_width, k);
  console.log("----------------------------------------------------------------------------");
  console.log("\t\t\tMASS vs HEIGTH");
  prediction(train, test, mass_height, k);
  console.log("----------------------------------------------------------------------------");
  console.log("\t\t\tMASS vs COLOR SCORE");
  prediction(train, test, mass_colorScore, k);
  console.log("----------------------------------------------------------------------------");
  console.log("\t\t\tWIDTH vs HEIGTH");
  prediction(train, test, width_height, k);
  console.log("----------------------------------------------------------------------------");
  console.log("\t\t\tWIDTH vs COLOR SCORE");
  prediction(train, test, width_colorScore, k);
  console.log("----------------------------------------------------------------------------");
  console.log("\t\t\tHEIGTH vs COLOR SCORE");
  prediction(train, test, height_colorScore, k);
}

function prediction(train: Array<IFruit>, test: IFruit, distances: Array<IEuclidian>, k: number): void {
  console.log(`fruit_name   mass    height    width    color_score`);
  console.log(`${test.fruit_name}       ${test.mass}        ${test.height}        ${test.width}       ${test.color_score}`);
  console.log(`K = ${k} neighbours`);
  console.log(`fruit_name   mass    height    width  color_score    distance`);
  let [accerts, mandarin_account, apple_account, lemon_account, orange_account] = [0, 0, 0, 0, 0, 0];
  distances.forEach((data) => {
    const { distance, index } = data;
    console.log(`${train[index].fruit_name}      ${train[index].mass}      ${train[index].height}      ${train[index].width}      ${train[index].color_score}           ${distance}`);
    // clase estimada
    (train[index].fruit_name === test.fruit_name) ? accerts += 1 : accerts += 0;
    switch (train[index].fruit_name) {
      case 'apple':
        ++apple_account;
        break;
      case 'lemon':
        ++lemon_account;
        break;
      case 'mandarin':
        ++mandarin_account;
        break;
      case 'orange':
        ++orange_account;
        break;
    }

  });

  console.log(`Prediccion: ${(100 * accerts) / k}%`);

  predictionClass(mandarin_account, lemon_account, apple_account, orange_account);
}

/**
 * Predecir la clase segun los k vecinos
 * @param mandarin contador de la clase mandarina
 * @param lemon contador de la clase lemon
 * @param apple contador de la clase apple
 * @param orange contador de la clase orange
 */
function predictionClass(mandarin: number, lemon: number, apple: number, orange: number): void {
  const prediction_class = Math.max(mandarin, lemon, apple, orange);
  console.log("Clase esperada: ");
  if (prediction_class === mandarin)
    console.log("\t\t[x]Mandarin");
  else if (prediction_class === lemon)
    console.log("\t\t[x]Lemon");
  else if (prediction_class === apple)
    console.log("\t\t[x]Apple");
  else if (prediction_class === orange)
    console.log("\t\t[x]Orange");
}
