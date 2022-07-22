const drawContainer = (containerSize, childSize, numberOfChildren) => {
  const bigSquare = document.createElement("div");
  bigSquare.id = "mainSquare";
  bigSquare.style.maxWidth = `${containerSize}px`;
  bigSquare.style.height = `${containerSize}px`;
  bigSquare.style.border = "1px solid gray";

  let rows = containerSize / childSize;
  let cols = containerSize / childSize;

  let totalFittingSquares = Math.floor(rows) * Math.floor(cols);

  if (totalFittingSquares > numberOfChildren) {
    totalFittingSquares = numberOfChildren;
  }

  for (let i = 0, len = totalFittingSquares; i < len; i++) {
    littleSquare = document.createElement("div");

    littleSquare.className = "littleSquareClass";
    littleSquare.style.height = `${childSize}px`;
    littleSquare.style.width = `${childSize}px`;
    littleSquare.style.float = "left";
    littleSquare.style.background = getRandomColor();
    littleSquare.style.cursor = "pointer";

    bigSquare.appendChild(littleSquare);
  }
  document.body.appendChild(bigSquare);

  let smallSquaresSelection =
    document.getElementsByClassName("littleSquareClass");

  for (let i = 0; i < smallSquaresSelection.length; i++) {
    (function (index) {
      smallSquaresSelection[index].addEventListener("mouseover", function () {
        Array.from(smallSquaresSelection).forEach(
          (v) => (v.style.background = getRandomColor())
        );
      });
    })(i);
  }

  let timer = null;

  for (let i = 0; i < smallSquaresSelection.length; i++) {
    smallSquaresSelection[i].addEventListener("mouseover", squareClicked);
    smallSquaresSelection[i].addEventListener("mouseleave", function () {
      clearTimeout(timer);
    });
    smallSquaresSelection[i].setAttribute("data-index", i);
  }

  function squareClicked(event) {
    let tinySquare = event.currentTarget;
    let i = tinySquare.getAttribute("data-index");

    timer = setTimeout(function () {
      smallSquaresSelection[i].parentNode.removeChild(smallSquaresSelection[i]);
    }, 2000);
  }

  function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  if (totalFittingSquares === 1) {
    document.getElementById(
      "squaresFit"
    ).innerHTML = `${totalFittingSquares} little square is in the BIG square.`;
  } else {
    document.getElementById(
      "squaresFit"
    ).innerHTML = `${totalFittingSquares} little squares are in the BIG square.`;
  }
};

//drawContainer(310, 200, 4);
drawContainer(500, 100, 30);
//drawContainer(413, 42, 30);
//drawContainer(200, 300, 2);
