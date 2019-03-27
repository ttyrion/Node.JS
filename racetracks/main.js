/**
 *  return true if pt1 is at the left and bottom side of pt2
 */
function comparePoints(pt1, pt2) {
  return (pt1.x < pt2.x) || (pt1.x == pt2.x && pt1.y < pt2.y );
}

function Painter(c, ctx) {
  this.c = c;
  this.ctx = ctx;
  this.renderRaceGround = function () {
    
  };

  this.renderBackGround = function () {

  };

  this.renderRaceTrack = function () {

  };

  this.clearBackGround = function (color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, c.width, c.height);
  };

  this.drawPoint = function (pt, color) {
    ctx.fillStyle = color;
    ctx.fillRect(pt.x, pt.y, 1, 1);
  };

  this.drawLine = function (from, to) {

  };

  this.generateTrackPoints = function () {
    /**
     * generate 10 to 20 points, Math.random() generates [0,1)
     */
    const num = parseInt(Math.random()*10 + 10);
    console.log("total points count: " + num);

    let points = [];
    for (let i = 0; i < num; ++i) {
      const x = parseInt(Math.random()*c.width);
      const y = parseInt(Math.random()*c.height);
      points.push({
        x:x,
        y:y
      });
    }

    points.forEach((pt) => {
      this.drawPoint(pt, "#000000");
    });

    /**
     * get all the points on the convex hull and draw out it.
     */
    let convexHullPoints = getConvexHull(points);
    this.ctx.moveTo(convexHullPoints[0].x, convexHullPoints[0].y);
    convexHullPoints.forEach((pt) => {
      this.ctx.lineTo(pt.x, pt.y);
    });
    this.ctx.lineTo(convexHullPoints[0].x, convexHullPoints[0].y);
    ctx.stroke();
  }
}

function drawRaceScene() {
  let c = document.getElementById("racing-ground-canva");
  /**
   * fix canvas 线条模糊的问题
   */
  c.width = c.offsetWidth;
  c.height = c.offsetHeight;

  let ctx = c.getContext("2d");
  let painter = new Painter(c, ctx);
  painter.clearBackGround("#00FF00");

  painter.generateTrackPoints();
}