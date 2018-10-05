/**
 * Axis aligned bounding box collision check
 * @param {Number} x1 rectangle 1 position
 * @param {Number} y1 rectangle 1 position
 * @param {Number} w1 rectangle 1 width
 * @param {Number} h1 rectangle 1 height
 * @param {Number} x2 rectangle 2 position
 * @param {Number} y2 rectangle 2 position
 * @param {Number} w2 rectangle 2 width
 * @param {Number} h2 rectangle 2 height
 * @return {Boolean} if the 2 rectangles collide
 */
function aabbCollisionTest(x1, y1, w1, h1, x2, y2, w2, h2) {
    return (
        x1 < w2 + x2 &&
        x1 + w1 > x2 &&
        y1 < h2 + y2 &&
        y1 + h1 > y2
    );
}

export { aabbCollisionTest };

/**
 * Check if point is in rectangle
 * @param {Number} x1 point position
 * @param {Number} y1 point position
 * @param {Number} x2 rectangle position
 * @param {Number} y2 rectangle position
 * @param {Number} h2 rectangle height
 * @param {Number} w2 rectange width
 * @return {Boolean} if the point is in rectangle
 */
function pointInRectCheck(x1, y1, x2, y2, h2, w2) {
    return (
        x1 >= x2 &&
        y1 >= y2 &&
        x1 <= x2 + w2 &&
        y1 <= y2 + h2
    );
}

export { pointInRectCheck };

/**
 * returns a promise that resolves after milliseconds
 * @param {Number} milliseconds milliseconds to wait
 * @return {Promise} resolves after milliseconds
 */
function wait(milliseconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, milliseconds);
    });
}

export { wait };