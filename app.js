const form = document.getElementById('callForm');
const tableBody = document.querySelector('#callTable tbody');
const searchInput = document.getElementById('searchInput');
const totalCalls = document.getElementById('totalCalls');

let callLogs = JSON.parse(localStorage.getItem('callLogs')) || [];

function renderTable(data) {
  tableBody.innerHTML = '';
  data.forEach(log => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${log.staff}</td>
      <td>${log.customer}</td>
      <td>${new Date(log.timestamp).toLocaleString()}</td>
      <td>${log.reason}</td>
    `;
    tableBody.appendChild(row);
  });
  totalCalls.textContent = data.length;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const log = {
    staff: document.getElementById('staff').value.trim(),
    customer: document.getElementById('customer').value.trim(),
    timestamp: document.getElementById('timestamp').value,
    reason: document.getElementById('reason').value.trim()
  };
  callLogs.push(log);
  localStorage.setItem('callLogs', JSON.stringify(callLogs));
  renderTable(callLogs);
  form.reset();
});

searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filtered = callLogs.filter(log =>
    log.staff.toLowerCase().includes(query) ||
    log.customer.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

function clearLogs() {
  if (confirm("Clear all logged calls?")) {
    callLogs = [];
    localStorage.removeItem('callLogs');
    renderTable(callLogs);
  }
}

renderTable(callLogs);