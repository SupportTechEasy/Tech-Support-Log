function exportCSV() {
  if (callLogs.length === 0) return alert("No data to export.");

  const headers = ["Support Staff", "Customer", "Time", "Reason"];
  const rows = callLogs.map(log => [
    log.staff,
    log.customer,
    new Date(log.timestamp).toLocaleString(),
    log.reason
  ]);

  let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "call_logs.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}