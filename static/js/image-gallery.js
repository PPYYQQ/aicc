document.addEventListener("DOMContentLoaded", function () {
    // 定义轮播图类
    class Carousel {
      constructor(container) {
        this.container = container;
        this.slideContainer = container.querySelector(".carousel-slide");
        this.slides = container.querySelectorAll(".carousel-slide img");
        this.prevBtn = container.querySelector(".carousel-arrow.left");
        this.nextBtn = container.querySelector(".carousel-arrow.right");
        this.currentIndex = 0;
        this.intervalId = null;
        this.touchStartX = 0;
  
        // 创建指示点
        this.dotsContainer = document.createElement("div");
        this.dotsContainer.className = "carousel-dots";
        container.appendChild(this.dotsContainer);
        this.dots = [];
        
        this.initialize();
      }
  
      initialize() {
        // 创建指示点
        this.slides.forEach((_, index) => {
          const dot = document.createElement("button");
          dot.addEventListener("click", () => {
            this.currentIndex = index;
            this.updateCarousel();
          });
          this.dotsContainer.appendChild(dot);
          this.dots.push(dot);
        });
  
        // 事件绑定
        this.prevBtn.addEventListener("click", () => this.navigate(-1));
        this.nextBtn.addEventListener("click", () => this.navigate(1));
        
        this.slideContainer.addEventListener("touchstart", e => {
          this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
  
        this.slideContainer.addEventListener("touchend", e => {
          const touchEndX = e.changedTouches[0].screenX;
          this.handleSwipe(touchEndX);
        }, { passive: true });
  
        // 自动播放控制
        this.container.addEventListener("mouseenter", () => this.stopAutoPlay());
        this.container.addEventListener("mouseleave", () => this.startAutoPlay());
  
        this.updateCarousel();
        this.startAutoPlay();
      }
  
      navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.slides.length) % this.slides.length;
        this.updateCarousel();
      }
  
      updateCarousel() {
        this.slideContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        this.dots.forEach((dot, idx) => {
          dot.classList.toggle("active", idx === this.currentIndex);
        });
      }
  
      handleSwipe(touchEndX) {
        const difference = this.touchStartX - touchEndX;
        if (difference > 50) this.navigate(1);
        if (difference < -50) this.navigate(-1);
      }
  
      startAutoPlay() {
        this.intervalId = setInterval(() => this.navigate(1), 3000);
      }
  
      stopAutoPlay() {
        clearInterval(this.intervalId);
      }
    }
  
    // 初始化所有轮播图
    document.querySelectorAll('.carousel-container').forEach(container => {
      new Carousel(container);
    });
  });