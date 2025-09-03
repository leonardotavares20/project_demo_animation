document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".image-container");
  const largeImage = document.querySelector(".container-large-image img");
  const containerLarge = document.querySelector(".container-large-image");
  const gridItems = document.querySelectorAll(".card-item");

  addListenerToImages();
  addListenerToContainer();
  populateGridItemsViewTransitionName();

  function addListenerToImages() {
    for (const image of images) {
      image.addEventListener("click", async () => {
        const img = image.querySelector("img");

        img.classList.add("active");

        img.style.viewTransitionName = "image";
        largeImage.style.viewTransitionName = "none";

        if (!document.startViewTransition) {
          containerLarge.classList.add("active");
          largeImage.src = img.src;
          return;
        }

        const transition = document.startViewTransition(() => {
          largeImage.src = img.src;
          img.style.viewTransitionName = "none";
          largeImage.style.viewTransitionName = "image";
          containerLarge.classList.add("active");
        });

        await transition.finished;

        image.style.viewTransitionName = "none";
        largeImage.style.viewTransitionName = "none";
      });
    }
  }

  function addListenerToContainer() {
    containerLarge.addEventListener("click", async () => {
      const activeImage = document.querySelector(".active img");
      document.body.style.overflow = "auto";

      if (!document.startViewTransition) {
        containerLarge.classList.remove("active");
        activeImage.classList.remove("active");
        return;
      }

      const transition = document.startViewTransition(() => {
        activeImage.style.viewTransitionName = "image";
        largeImage.style.viewTransitionName = "none";
        containerLarge.classList.remove("active");
        activeImage.classList.remove("active");
      });

      await transition.finished;

      activeImage.style.viewTransitionName = "none";
      largeImage.style.viewTransitionName = "none";
    });
  }

  function populateGridItemsViewTransitionName() {
    if (!document.startViewTransition) {
      return;
    }

    gridItems.forEach((item, index) => {
      item.style.viewTransitionName = `card-item-${index}`;

      item.addEventListener("click", () => {
        document.startViewTransition(() => {
          item.remove();
        });
      });
    });
  }
});
