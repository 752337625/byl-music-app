import { DomCEL } from '@d/celement';
/**
 * 创建element
 */
function cEl(param: DomCEL): HTMLElement {
	const el = document.createElement(param.dom);
	const pm: Array<string> = Object.keys(param);
	pm.forEach(i => {
		el[i] = param[i];
	});
	return el;
}
export default cEl;
export { cEl };
