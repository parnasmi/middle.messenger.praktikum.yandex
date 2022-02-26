export function closeModal(popupSelector:string) {
  const popup = document.querySelector(`.${popupSelector}`) as HTMLElement;
  const overlay = document.querySelector(".overlay-popup") as HTMLElement;

  popup.classList.remove("active");
  overlay.classList.remove("active");
}
