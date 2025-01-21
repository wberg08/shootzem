class SlideZone1 {
  angle = Math.PI / 3
  speed = 0.3

  slides(x,y) {
    return y < 200 && x < 700
  }
}

class SlideZone2 {
  angle = 2* Math.PI / 3
  speed = 0.3

  slides(x,y) {
    return y > 400 && x < 700
  }
}
