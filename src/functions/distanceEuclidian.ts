/**
 * Distancia euclidiana entre dos puntos
 * @param x_1
 * @param y_1
 * @param x_2 
 * @param y_2 
 * @returns 
 */
export default function distanceEuclidian(x_1: number, y_1: number, x_2: number, y_2: number): number {
  return Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2);
}