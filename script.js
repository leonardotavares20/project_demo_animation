document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".image-container img");
  const largeImage = document.querySelector(".container-large-image img");
  const containerLarge = document.querySelector(".container-large-image");

  addListenerToImages();
  addListenerToContainer();

  //   function populateItemViewTransitionName() {
  //     const items = document.querySelectorAll(".image-container img");
  //     items.forEach((item) => {
  //       item.style.viewTransitionName = `item-${item.dataset.id}`;
  //     });
  //   }

  function addListenerToImages() {
    for (const image of images) {
      image.addEventListener("click", () => {
        document.body.style.overflow = "hidden";

        document.startViewTransition(() => {
          largeImage.src = image.src;
          containerLarge.classList.add("active");
        });
      });
    }
  }

  function addListenerToContainer() {
    containerLarge.addEventListener("click", () => {
      document.body.style.overflow = "auto";

      document.startViewTransition(() => {
        containerLarge.classList.remove("active");
      });
    });
  }
});
