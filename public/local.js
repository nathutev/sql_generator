
let history = JSON.parse(localStorage.getItem('sqlQueryHistory')) || {};
let counter = Object.keys(history).length;

function updateHistorySidebar() {
  const historyContent = document.getElementById("history-content");
  const clearHistoryBtn = document.getElementById("clear-history");
  
  historyContent.innerHTML = '';

  if (Object.keys(history).length === 0) {
    historyContent.innerHTML = '<div class="empty-history">No history</div>';
    clearHistoryBtn.style.visibility = "hidden";
    return;
  }

  Object.keys(history)
    .sort((a, b) => b - a)
    .forEach(key => {
      clearHistoryBtn.style.visibility = "visible";

      const item = history[key];
      const timestamp = new Date(parseInt(item.timestamp)).toLocaleString();
      
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <h3>Query #${parseInt(key) + 1}</h3>
        <p><strong>Table:</strong> ${item.table}</p>
        <p><strong>Columns:</strong> ${item.column}</p>
        <p><strong>Query:</strong> ${item.query}</p>
        <p><strong>Result:</strong> ${item.resultText}</p>
        <div class="timestamp">${timestamp}</div>`;
        
      historyItem.addEventListener('click', () => {
        document.getElementById("table").value = item.table;
        document.getElementById("column").value = item.column;
        document.getElementById("query").value = item.query;
        document.getElementById("result").textContent = item.resultText;
        
        toggleSidebar();
      });
        
      historyContent.appendChild(historyItem);
    });
}
    
function toggleSidebar() {
  const sidebar = document.getElementById("history-sidebar");
  const overlay = document.getElementById("overlay");
      
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
      
  if (sidebar.classList.contains("active")) {
    updateHistorySidebar();
  }
}

async function sendQuery() {
  const table = document.getElementById("table").value;
  const column = document.getElementById("column").value;
  const query = document.getElementById("query").value;

  if (!table || !column || !query) {
    document.getElementById("result").textContent = "⚠️ All fields are required!";
    return;
  }

  const response = await fetch("http://localhost:10000/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ table, column, query })
  });
      
  const resultText = await response.text();
  document.getElementById("result").textContent = resultText;
      
  writeHistory(table, column, query, resultText);
}

function writeHistory(table, column, query, resultText) {
  history[counter] = {
    table: table,
    column: column,
    query: query,
    resultText: resultText,
    timestamp: Date.now()
  };

  localStorage.setItem('sqlQueryHistory', JSON.stringify(history));
      
  counter++;
}

document.getElementById("history-btn").addEventListener("click", toggleSidebar);
document.getElementById("close-sidebar").addEventListener("click", toggleSidebar);
document.getElementById("overlay").addEventListener("click", toggleSidebar);
document.getElementById("clear-history").addEventListener("click", () => {
  if (confirm("Clear history?")) {
    history = {};
    counter = 0;
    localStorage.removeItem('sqlQueryHistory');
    updateHistorySidebar();
  }
});

updateHistorySidebar();