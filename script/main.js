const makeCellLive = function(cell) {
  document.getElementById(cell.join(":")).className = "cell";
  fetch("/makecelllive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cell })
  });
};

const applyColour = function(document, cell) {
  document.getElementById(cell.join(":")).className = "colored";
};

const applyPreferences = function(document, nextGenCells) {
  nextGenCells.forEach(applyColour.bind(null, document));
};

const createTableBody = function(document, size) {
  const tbody = document.createElement("tbody");
  for (index = 0; index < size; index++) {
    let row = document.createElement("tr");
    for (innerIndex = 0; innerIndex < size; innerIndex++) {
      let tdata = document.createElement("td");
      tdata.id = `${index}:${innerIndex}`;
      tdata.onclick = makeCellLive.bind(null, [index, innerIndex]);
      row.appendChild(tdata);
    }
    tbody.appendChild(row);
  }
  return tbody;
};

const loadTable = function(document, nextGenCells) {
  const container = document.getElementById("mainContainer");
  container.innerText = null;
  const table = document.createElement("table");
  const tbody = createTableBody(document, 15);
  table.appendChild(tbody);
  container.appendChild(table);
  applyPreferences(document, nextGenCells);
};

const intializeGame = function() {
  fetch("/getgame")
    .then(res => res.json())
    .then(game => {
      loadTable(document, game.cells);
      startGame();
    });
};

const startGame = function() {
  setInterval(() => {
    fetch("/getgame")
      .then(res => res.json())
      .then(game => {
        loadTable(document, game.cells);
      });
  }, 1000);
};

window.onload = intializeGame;
