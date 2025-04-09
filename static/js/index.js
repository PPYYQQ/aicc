document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".gallery img");
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);

    images.forEach(image => {
        image.addEventListener("click", () => {
            lightbox.classList.add("active");
            const img = document.createElement("img");
            img.src = image.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });
});