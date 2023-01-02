const addSamoyedImage = () => {
	const imageUrl = 'https://i.ibb.co/tCR0sDp/samoyed-small.png';
	const img = document.createElement('img');
	img.classList = 'samoyed-small';
	img.src = imageUrl;
	img.alt = 'samoyed';
	img.border = 0;
	img.style.position = 'absolute';
	img.style.top = `${Math.random() * document.body.scrollHeight}px`;
	img.style.left = `${Math.random() * document.body.scrollWidth}px`;
	img.style.zIndex = 1000;
	img.style.width = '40px';
	img.style.height = 'auto';

	const a = document.createElement('a');
	a.href = '#';
	a.appendChild(img);
	a.addEventListener('click', anchorHandler);
	document.body.appendChild(a);
}

const anchorHandler = async (e) => {
	e.preventDefault();
	const a = e.currentTarget;
	const img = a.querySelector('img');
	a.removeEventListener('click', anchorHandler);
	// Animate the image
	img.style.transition = 'all 0.5s ease-in-out';
	img.style.transform = 'scale(0)';
	setTimeout(() => {
	  a.remove();
	}, 500);

	const result = await chrome.storage.sync.get(['count']);
	const count = 1 + (result.count || 0);
	chrome.storage.sync.set({count: count});
	chrome.runtime.sendMessage({type: 'UPDATE_COUNT', data: count});
};

if (Math.random() < .1) {
	addSamoyedImage();
}