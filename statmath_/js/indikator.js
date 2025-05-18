const container = document.querySelector('.card-container');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
  container.style.transform = `translateX(-${index * 80}vw)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
  currentIndex = index;
}

function navigate(direction) {
  let newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < dots.length) {
    showSlide(newIndex);
  }
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    showSlide(index);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && currentIndex < dots.length - 1) {
    showSlide(currentIndex + 1);
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    showSlide(currentIndex - 1);
  }
});

showSlide(0);
