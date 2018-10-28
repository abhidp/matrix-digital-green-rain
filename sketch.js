var symbolSize = 16
var streams = []

function setup() {
  createCanvas(
    1450, 800
  )
  background(0, 160)
  // stream = new Stream()
  // stream.generateSymbols()
  var x = 0
  for (var i = 0; i <= (width / symbolSize); i++) {
    var stream = new Stream()
    stream.generateSymbols(x, random(-1000, 0))
    streams.push(stream)
    x += symbolSize
  }
  textSize(symbolSize)
}


function draw() {
  background(0, 160)
  streams.forEach(function (stream) {
    stream.render()
  })
}

function Symbol(x, y, speed, first) {
  this.x = x
  this.y = y
  this.value
  this.speed = speed
  this.switchInterval = round(random(2, 20))
  this.first = first

  this.setToRandomSymbol = function (params) {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96)))
    }
  }

  this.rain = function () {
    if (this.y >= height)
      this.y = 0
    else
      this.y += this.speed
  }
}

function Stream() {
  this.symbols = []
  this.totalSymbols = round(random(5, 40))
  this.speed = random(3, 6)

  this.generateSymbols = function (x, y) {
    var first = round(random(0, 3)) == 1

    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first)
      symbol.setToRandomSymbol()
      this.symbols.push(symbol)
      y -= symbolSize
      first = false
    }
  }

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(180, 200, 200)
      } else {
        fill(0, 240, 120)
      }
      text(symbol.value, symbol.x, symbol.y)
      symbol.rain()
      symbol.setToRandomSymbol()
    })
  }
}
