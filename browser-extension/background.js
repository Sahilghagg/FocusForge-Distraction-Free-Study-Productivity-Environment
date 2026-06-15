let blockedPatterns = [];

async function fetchRules() {
  try {
    const response = await fetch('http://localhost:3456/rules');
    const data = await response.json();
    blockedPatterns = data.blocked || [];
    console.log('[FocusForge] Rules updated:', blockedPatterns);
  } catch (err) {
    blockedPatterns = [];
  }
}

chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    if (details.frameId !== 0) return; // only main frame
    const url = new URL(details.url);
    const hostname = url.hostname;
    for (const pattern of blockedPatterns) {
      if (hostname.includes(pattern) || url.href.includes(pattern)) {
        chrome.tabs.update(details.tabId, {
          url: chrome.runtime.getURL('blocked.html')
        });
        return;
      }
    }
  },
  { url: [{ schemes: ['http', 'https'] }] }
);

setInterval(fetchRules, 2000);
fetchRules();