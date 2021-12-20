import cEl from './cEl';
export default function overlayfn(param: any): void {
	const div = cEl({
		dom: 'div',
		className: 'van-overlay',
		innerHTML: `<div class="wrapper"><div class="byl-error">${param}</div></div>`,
	});
	document.body.appendChild(div);
}
