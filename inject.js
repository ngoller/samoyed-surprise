let images = [];
let xs = [];
let lastUpdateTime = performance.now();
// How many milliseconds to wait before updating
const frameMinTime = 20;
const velocity = .04;

function updateLoop(dt) {
	const now = performance.now();
	const frameTime = now - lastUpdateTime;
	if (frameTime < frameMinTime) {
		requestAnimationFrame(updateLoop);
		return;
	}
	console.log(`frameTime: ${frameTime}`);
	const newX = velocity * frameTime;
	for (let i = 0; i < images.length; i++) {
		xs[i] -= newX;
		images[i].style.transform = `translate(${xs[i]}px, ${0}px)`;
	}
	lastUpdateTime = now;
	requestAnimationFrame(updateLoop);
}

updateLoop(0);

const addSamoyedImage = (img) => {
	const a = document.createElement('a');
	a.href = '#';
	a.appendChild(img);
	a.addEventListener('click', anchorHandler);
	document.body.appendChild(a);
	images.push(img);
	xs.push(0);
}

const createStandardImage = () => {
	const imageUrl = chrome.runtime.getURL("images/white-dog-2.gif");
	const img = document.createElement('img');
	img.dataset.type = 'standard';
	img.src = imageUrl;
	img.alt = 'samoyed';
	img.border = 0;
	img.style.position = 'absolute';
	img.style.top = `${Math.random() * document.body.scrollHeight}px`;
	img.style.left = `${Math.random() * document.body.scrollWidth}px`;
	img.style.zIndex = 1000;
	img.style.width = '80px';
	img.style.height = 'auto';
	return img;
}

const createRareImage = () => {
	const imageUrl = chrome.runtime.getURL("images/samoyed-rare.png");
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
	chrome.storage.sync.set({ count: result });
	chrome.runtime.sendMessage({ type: 'UPDATE_COUNT', data: { count: result[type], countType: type } });
};


const standardChance = 1.04;
const rareChance = .004;

for (let i = 50; i > 0; i--) {
	if (Math.random() < standardChance) {
		addSamoyedImage(createStandardImage());
	} else if (Math.random() < rareChance) {
		addSamoyedImage(createRareImage());
	}
}

