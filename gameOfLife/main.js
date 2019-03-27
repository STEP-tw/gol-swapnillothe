let cells = [[0, 1], [0, 1], [0, 2], [0, 2], [1, 4], [2, 2], [1, 2]];

const makeCellLive = function(document, cell) {
  cells.push(cell);
  applyColour(document, cell);
};

const applyColour = function(document, cell) {
  document.getElementById(cell.join(":")).className = "colored";
};

const applyPreferences = function(document, cells) {
  cells.forEach(applyColour.bind(null, document));
};

const display = function(cells) {
  alert(id);
};

const createTableBody = function(document, size) {
  const tbody = document.createElement("tbody");
  for (index = 0; index < size; index++) {
    let row = document.createElement("tr");
    for (innerIndex = 0; innerIndex < size; innerIndex++) {
      let tdata = document.createElement("td");
      tdata.id = `${index}:${innerIndex}`;
      tdata.onclick = makeCellLive.bind(null, document, [index, innerIndex]);
      row.appendChild(tdata);
    }
    tbody.appendChild(row);
  }
  return tbody;
};

const loadTable = function(document, cells) {
  const container = document.getElementById("mainContainer");
  container.innerText = null;
  const table = document.createElement("table");
  const tbody = createTableBody(document, 15);
  table.appendChild(tbody);
  container.appendChild(table);
  applyPreferences(document, cells);
};

const startGame = function() {
  setInterval(() => {
    fetch("/getnextgen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cells)
    })
      .then(res => res.json())
      .then(nextGenCells => {
        cells = nextGenCells;
        loadTable(document, cells);
      });
  }, 1000);
};

window.onload = loadTable.bind(null, document, cells);
