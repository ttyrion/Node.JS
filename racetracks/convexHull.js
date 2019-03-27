/**
 * Andrew's monotone chain convex hull algorithm
 * 这个算法解决了凸包问题中点重叠、共线、退化成线段和点的问题，很优美，时间复杂度O(nlogn)
 * 参考wiki: https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain
 */

function getConvexHull (points) {
  let sortedPoints = sortPoints(points);
  /**
   * the upper and lower part of the convex hull
   */
  let upper = [];
  let lower = [];

  sortedPoints.forEach((item,index) => {
    /**
     * Note that, the y-coordinate of canvas is oposite to that of Rectangular Coordinates
     */
    while ( upper.length >= 2 && (cross(upper[upper.length-2], upper[upper.length-1], item) <= 0)) {
      upper.pop();
    }
    upper.push(item);
  });

  const length = sortedPoints.length;
  for (let i = length - 1; i >= 0; --i) {
    while ( lower.length >= 2 && (cross(lower[lower.length-2], lower[lower.length-1], sortedPoints[i]) <= 0)) {
      lower.pop();
    }
    lower.push(sortedPoints[i]);
  }

  /**
   * 起点和终点重复
   */
  upper.pop();
  lower.pop();

  return upper.concat(lower);
}

/**
 * sort points first by x-coordinate, and in case of a tie, by y-coordinate
 */
function sortPoints (points) {
  return points.sort((pt1,pt2) => {
    if (pt1.x == pt2.x) {
      return pt1.y - pt2.y;
    } else {
      return pt1.x - pt2.x;
    };
  });    
}

/**
 * 计算向量OA叉乘OB
 */
function cross(pto, pta, ptb) {
  let OA = {
    x: pta.x - pto.x,
    y: pta.y - pto.y
  };

  let OB = {
    x: ptb.x - pto.x,
    y: ptb.y - pto.y
  };

  return OA.x * OB.y - OB.x * OA.y;
}