const addSamoyedImage = (img) => {
	const a = document.createElement('a');
	a.href = '#';
	a.appendChild(img);
	a.addEventListener('click', anchorHandler);
	document.body.appendChild(a);
}

const createStandardImage = () => {
	const imageUrl = 'https://i.ibb.co/tCR0sDp/samoyed-small.png';
	const img = document.createElement('img');
	img.dataset.type = 'standard';
	img.src = imageUrl;
	img.alt = 'samoyed';
	img.border = 0;
	img.style.position = 'absolute';
	img.style.top = `${Math.random() * document.body.scrollHeight}px`;
	img.style.left = `${Math.random() * document.body.scrollWidth}px`;
	img.style.zIndex = 1000;
	img.style.width = '40px';
	img.style.height = 'auto';
	return img;
}

const createRareImage = () => {
	const imageUrl = 'https://i.ibb.co/z5Z5nrj/samoyed-rare.png';
	const img = document.createElement('img');
	img.dataset.type = 'rare';
	img.src = imageUrl;
	img.alt = 'samoyed rare';
	img.border = 0;
	img.style.position = 'absolute';
	img.style.top = `${Math.random() * document.body.scrollHeight}px`;
	img.style.left = `${Math.random() * document.body.scrollWidth}px`;
	img.style.zIndex = 1000;
	img.style.width = '20px';
	img.style.height = 'auto';
	return img;
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

	const type = img.dataset.type;
	let result = await chrome.storage.sync.get('count');
	result = result.count || {};
	result[type] = 1 + (result[type] || 0);
	chrome.storage.sync.set({count: result});
	chrome.runtime.sendMessage({type: 'UPDATE_COUNT', data: {count: result[type], countType: type}});
};

if (Math.random() < .5) {
	addSamoyedImage(createStandardImage());
} else if (Math.random() < 1) {
	addSamoyedImage(createRareImage());
}