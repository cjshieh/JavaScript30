const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
let firstTime = 1;

function setClock() {
    // In order to slower the initial clock hands' movement, add 
    // preload class. After the initial, remove it.
  if (firstTime === 1) {
    firstTime = 0;
  } else {
    const hands = document.querySelectorAll(".hand");
    Array.from(hands).map(hand => {
      hand.classList.remove("preload");
    });
  }

  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  addClassToElement(secondHand, seconds);
  addClassToElement(minuteHand, minutes);
  addClassToElement(hourHand, hours);

  secondHand.style.transform = `rotate(${getRotationDegree(seconds, 60)}deg)`;
  minuteHand.style.transform = `rotate(${getRotationDegree(minutes, 60)}deg)`;
  hourHand.style.transform = `rotate(${getRotationDegree(hours, 12)}deg)`;
}

function getRotationDegree(value, maxTime) {
  return 360 / maxTime * value + 90;
}

function addClassToElement(element, value) {
  element.classList.toggle("disable-css-transition", value === 0);
}

setInterval(setClock, 1000);
