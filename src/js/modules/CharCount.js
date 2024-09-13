export default class CharCount {
  constructor(textareaSelector, countSelector) {
    this.textarea = document.querySelector(textareaSelector);
    this.countElement = document.querySelector(countSelector);

    if (this.textarea && this.countElement) {
      this.limit = parseInt(this.textarea.getAttribute('data-limitation'), 10) || 0;
      this.init();
    }
  }

  init() {
    this.updateCount();
    this.textarea.addEventListener('input', () => this.updateCount());
    this.textarea.addEventListener('paste', () => setTimeout(() => this.updateCount(), 0));
    this.textarea.addEventListener('cut', () => setTimeout(() => this.updateCount(), 0));
    this.textarea.addEventListener('keydown', () => setTimeout(() => this.updateCount(), 0));
  }

  updateCount() {
    const currentLength = this.textarea.value.length;
    this.countElement.innerHTML = `<span>${currentLength}</span>/${this.limit}`;

    if (currentLength > this.limit) {
      this.countElement.classList.add('is-limit-exceeded');
    } else {
      this.countElement.classList.remove('is-limit-exceeded');
    }
  }
}