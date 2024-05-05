export const scrollToTop = () => {
  window.scrollTo(0, 0)
}

export const scrollToNewItem = () => {
  const item = document.querySelectorAll('.discover__item--new');
  if (item) {
    item[item.length - 1].scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}
