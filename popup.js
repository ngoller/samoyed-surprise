// Retrieve the count from storage
async function updateCount() {
  chrome.action.setBadgeText({text: ''});
  const result = await chrome.storage.sync.get('count');
  const resultCount = result.count?.standard || 0;
  const rareResultCount = result.count?.rare || 0;
  document.querySelector('.samoyedCount')?.textContent = `${resultCount}`;
  document.querySelector('.samoyedRareCount')?.textContent = `${rareResultCount}`;
  const devotion = resultCount + rareResultCount * 10;
  document.querySelector('.totalDevotion').textContent = `${devotion}`;
}

updateCount();