/**
 * Quick 'n dirty 2D vector class.
 */
export default class Vector2D {
  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  /**
   * Returns a vector that is the negation of this vector.
   * @returns A new vector with the coordinates negated.
   */
  negate () {
    return new Vector2D(-this.x, -this.y);
  }

  /**
   * Adds the specified vector to this vector.
   * @param {vector-like} v The vector to add to this vector.
   * @returns A new vector that is the sum of this vector and the specified vector.
   */
  add ({ x, y }) {
    return new Vector2D(this.x + (x || 0), this.y + (y || 0 ));
  }

  /**
   * Subtracts the specified vector from this vector.
   * @param {vector-like} v The vector to subtract from this vector.
   * @returns A new vector that is the difference of this vector and the specified vector.
   */
  subtract ({ x, y }) {
    return new Vector2D(this.x - (x || 0), this.y - (y || 0 ));
  }

  /**
   * Scales this vector by the specifiec factor.
   * @param {Number} factor The scale factor.
   * @returns A new vector that is this vector scaled by the specified scale factor.
   */
  scale (factor) {
    return new Vector2D(this.x * factor, this.y * factor);
  }

  /**
   * Determines if the specified vector is equal to this vector.
   * @param {vector-like} v The vector to compare.
   * @param {*} epsilon Optional tolerance value. If not specified, 1e-6 is used.
   * @returns True if the specified vector is equal to this vector; Otherwise, false.
   */
  equals ({ x, y }, epsilon) {
    epsilon = epsilon != null && !Number.isNaN(epsilon) && Number.isFinite(epsilon)
      ? epsilon
      : 1e-6;

    return Math.abs(this.x - (x || 0)) <= epsilon &&
           Math.abs(this.y - (y || 0 )) <= epsilon;
  }

  /**
   * Gets the length of this vector.
   */
  getLength () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Returns the normal of this vector.
   * @returns A new vector that is the normal of this vector.
   */
  normal () {
    var len = this.getLength();

    return Vector2D.scale(this, 1 / len);
  }

  /**
   * Gets the string value of this vector.
   * @returns A string representation of this vector.
   */
  toString () {
    return `{{ x: ${this.x}, y: ${this.y} }}`;
  }

  /**
   * Negates the specified vector.
   * @param {vector-like} v The vector to negate.
   * @returns A new vector whose coordinates are the negation of the specified vector's coordinates.
   */
  static negate ({ x, y }) {
    return new Vector2D(-x, -y);
  }

  /**
   * Adds two vectors.
   * @param {vector-like} a The first vector to add.
   * @param {vector-like} b The second vector to add.
   * @returns A new vector that is the sum of the specified vectors.
   */
  static add ({ x: ax, y: ay }, { x: bx, y: by }) {
    return new Vector2D((ax || 0) + (bx || 0), (ay || 0) + (by || 0));
  }

  /**
   * Subtracts two vectors.
   * @param {vector-like} a The first vector.
   * @param {vector-like} b The vector to subtract.
   * @returns A new vector that is the difference of the specified vectors.
   */
   static subtract ({ x: ax, y: ay }, { x: bx, y: by }) {
    return new Vector2D((ax || 0) - (bx || 0), (ay || 0) - (by || 0));
  }

  /**
   * Scales the specified vector by the specified scale factor.
   * @param {vector-like} v The vector to scale.
   * @param {Number} factor The scale factor.
   * @returns A new vector that is the vector scaled by the specified factor.
   */
   static scale ({ x, y }, factor) {
    return new Vector2D((x || 0) * factor, (y || 0) * factor);
  }

  /**
   * Determines if two vectors are equal.
   * @param {vector-like} a The first vector.
   * @param {vector-like} b The second vector.
   * @param {*} epsilon Optional tolerance value. If not specified, 1e-6 is used.
   * @returns True if the vectors are equal; Otherwise, false.
   */
  static equals ({ x: ax, y: ay }, { x: bx, y: by }, epsilon) {
    epsilon = epsilon != null && !Number.isNaN(epsilon) && Number.isFinite(epsilon)
      ? epsilon
      : 1e-6;

    return Math.abs(ax - bx) <= epsilon &&
           Math.abs(ay - by) <= epsilon;
  }

  /**
   * Determines the dot product of two vectors.
   * @param {vector-like} a The first vector.
   * @param {vector-like} b The second vector.
   * @returns The dot product of the vectors.
   */
  static dot ({ x: ax, y: ay }, { x: bx, y: by }) {
    return (ax || 0) * (bx || 0) + (ay || 0) * (by || 0);
  }

  /**
   * Determines the cross product of two vectors.
   * @param {vector-like} a The first vector.
   * @param {vector-like} b The second vector.
   * @returns The cross product of the vectors.
   */
   static cross ({ x: ax, y: ay }, { x: bx, y: by }) {
    return (ax || 0) * (by || 0) - (ay || 0) * (bx || 0);
  }
}