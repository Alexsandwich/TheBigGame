$(document).ready(() => {
  var socket = io()

  var canvas = $("#place")[0]
  var ctx = canvas.getContext("2d")

  socket.on("canvas", canvasData => {
    canvasData.forEach((row, rowIndex) => {
      // console.log(row)
      row.forEach((col, colIndex) => {
        // console.log(colIndex, rowIndex)
        ctx.fillStyle = col
        ctx.fillRect(colIndex * 10, rowIndex * 10, 10, 10)
      })
    })
  })

  $("#submit").click(() => {
    socket.emit("color", {
      col: parseInt($("#x-coord").val()),
      row: parseInt($("#y-coord").val()),
      color: $("#color").val()
    })
  })
})


function initialise() {
  var canvas = document.getElementById("place");
  canvas.addEventListener("mousedown", MouseDown, false);
}

function MouseDown(event) {

    canvas_x = event.pageX / 10;
    canvas_y = event.pageY / 10 ;
    alert("X= " + canvas_x + " Y= " + canvas_y);
    
}

// function printMousePos(event) {
//   document.body.textContent =
//     "clientX: " + event.clientX +
//     " - clientY: " + event.clientY;
// }

// document.addEventListener("click", printMousePos);

