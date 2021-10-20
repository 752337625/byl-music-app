(function flexible(window, document) {
	/**
	 * document.documentElement属性返回当前文档的根元素节点（root）。它通常是document节点的第二个子节点，紧跟在document.doctype节点后面。
	 * HTML网页的该属性，一般是 <html>节点。
	 */
	let docEl = document.documentElement;
	let dpr = window.devicePixelRatio || 1;

	// adjust body font size
	function setBodyFontSize() {
		if (document.body) {
			document.body.style.fontSize = 12 * dpr + 'px';
		} else {
			document.addEventListener('DOMContentLoaded', setBodyFontSize);
		}
	}
	setBodyFontSize();

	// set 1rem = viewWidth / 192 px
	function setRemUnit() {
		let rem = docEl.clientWidth / 37.5;
		docEl.style.fontSize = rem + 'px';
	}

	setRemUnit();

	// reset rem unit on page resize
	window.addEventListener('resize', setRemUnit);
	//
	/**
	 * 从内存中加载浏览器页面是会触发的函数，这个函数在页面切换时会一直触发。
	 * 第一次加载时，它的触发顺序排在load事件后面。从缓存加载时，load事件不会触发，因为网页在缓存中的样子通常是load事件的监听函数运行后的样子，所以不必重复执行。
	 * pageshow事件有一个persisted属性，返回一个布尔值。页面第一次加载时，这个属性是false；当页面从缓存加载时，这个属性是true。
	 * pagehide事件实例也有一个persisted属性，将这个属性设为true，就表示页面要保存在缓存中；设为false，表示网页不保存在缓存中，这时如果设置了unload 事件的监听函数，该函* 数将在 pagehide 事件后立即运行。
	 */
	window.addEventListener('pageshow', function (e) {
		if (e.persisted) {
			setRemUnit();
		}
	});

	// detect 0.5px supports
	if (dpr >= 2) {
		let fakeBody = document.createElement('body');
		let testElement = document.createElement('div');
		testElement.style.border = '.5px solid transparent';
		fakeBody.appendChild(testElement);
		docEl.appendChild(fakeBody);
		if (testElement.offsetHeight === 1) {
			docEl.classList.add('hairlines');
		}
		docEl.removeChild(fakeBody);
	}
})(window, document);
