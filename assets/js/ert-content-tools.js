// Ortak helper: class ekleme/çıkarma
function ctToggleClass(el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className);
    } else {
        el.classList.add(className);
    }
}

// Ortak helper: event binding
function ctBind(selector, event, handler) {
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener(event, handler);
    });
}