class SlideZone1 {
  angle = Math.PI / 3
  speed = 0.3

  slides(x,y) {
    return x < 600 && y < 200
    || x >= 600 && x + y < 800
  }
}

class SlideZone2 {
  angle = 2* Math.PI / 3
  speed = 0.3

  slides(x,y) {
    return x < 600 && y > 400
    || x >= 600 && x - y < 200
  }
}
