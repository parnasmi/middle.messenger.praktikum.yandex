import { Block } from "../../utils";

export class Popup extends Block {
	protected openModalButtons: NodeList;
	protected closeModalButtons: NodeList;
	protected overlay: HTMLElement;

	componentDidMount() {
			this.openModalButtons = document.querySelectorAll("[data-modal-target]");
			this.closeModalButtons = document.querySelectorAll("[data-close-button]");
			this.overlay = document.querySelector(".overlay-popup") as HTMLElement;
			this.openModalButtons.forEach((button) => {
				button.addEventListener("click", () => {
					const popup = document.querySelector(`.${(button as HTMLElement).dataset.modalTarget}`);
					this.openModal(popup as HTMLElement)
				});
			});

			this.overlay?.addEventListener("click", () => {
				const modals = document.querySelectorAll(".popup.active");
				modals.forEach((modal) => {
					this.closeModal(modal as HTMLElement);
				});
			});
	}

	protected openModal(popup: HTMLElement) {
		if (popup === null) return;
		popup.classList.add('active');
		this.overlay?.classList.add('active');
	}

	public closeModal(popup: HTMLElement) {
		if (popup === null) return;
		popup.classList.remove('active');
		this.overlay?.classList.remove('active');
	}
}
