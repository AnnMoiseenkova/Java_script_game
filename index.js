var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

// var colors = ['blue', 'red', 'green', 'yellow', 'black', 'pink']

var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', hendleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function startGame() {
  score = 0
  $gameTime.setAttribute('disabled', 'true')
  setGameTime()
  
  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  hide($start)

  var interval =  setInterval(function() {
    var time = parseFloat($time.textContent)
    
    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  var time = parseInt($gameTime.value) || 0
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

function endGame() {
  isGameStarted = false
  setGameScore()
  $game.innerHTML = ''
  show($start)
  $game.style.backgroundColor = '#ccc'
  hide($timeHeader)
  show($resultHeader)
  $gameTime.removeAttribute('disabled')
}

function hendleBoxClick(event) {
  if (!isGameStarted) {
    return 
  }

  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  $game.innerHTML = ''
  var box = document.createElement('div')
  var boxSize = getRandom(30, 100)
  var gameSize = $game.getBoundingClientRect()
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize
  var r = getRandom(0, 255)
  var g = getRandom(0, 255)
  var b = getRandom(0, 255)
  // var randomColor = getRandom(0, colors.length)

  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  // box.style.backgroundColor = '#000'
  // box.style.backgroundColor = 'rgb(0, 0, 0)'
  // box.style.backgroundColor = 'rgb(' + r + ', ' + g + ', '+ b + ')'
  box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  // box.style.backgroundColor = colors[randomColor]
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}