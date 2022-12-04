const selector = '.flow-editor';

/**
 * 设置蓝图编辑器的鼠标样式
 */
export function setFlowEditorCursorStyle(cursor: string) {
  const el = document.querySelector(selector);
  if (isHTMLElement(el)) {
    el.style.cursor = cursor;
  }
}

/**
 * 重置蓝图编辑器的鼠标样式
 */
export function resetFlowEditorCursorStyle() {
  const el = document.querySelector(selector);
  if (isHTMLElement(el)) {
    el.style.cursor = 'default';
  }
}

/**
 * 判断是否为HTMLElement
 */
function isHTMLElement(obj: Element | null): obj is HTMLElement {
  if (!obj) {
    return false;
  }

  if (obj.nodeType) {
    return obj.nodeType == 1;
  }

  return false;
}
