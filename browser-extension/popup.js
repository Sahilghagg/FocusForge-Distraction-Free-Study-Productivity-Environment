async function updateStatus() {
  try {
    const res = await fetch('http://localhost:3456/rules');
    const data = await res.json();
    const statusEl = document.getElementById('status');
    if (data.blocked && data.blocked.length > 0) {
      statusEl.innerHTML = '<span class="active">● Active session</span><br>Blocking ' + data.blocked.length + ' sites';
    } else {
      statusEl.innerHTML = '<span class="inactive">● No active session</span>';
    }
  } catch (err) {
    document.getElementById('status').innerHTML = '<span class="inactive">● Offline (app not running)</span>';
  }
}
updateStatus();
setInterval(updateStatus, 2000);