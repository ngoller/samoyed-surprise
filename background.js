chrome.runtime.onMessage.addListener(( {type, data}, sender ) => {
	if (type === 'UPDATE_COUNT') {
		chrome.action.setBadgeText({ text: data.toString() });
	}
});