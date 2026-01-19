document.addEventListener('DOMContentLoaded', () => {
  const sky = document.getElementById('sky');
  const modal = document.getElementById('memoryModal');
  const closeBtn = document.querySelector('.close');
  const memoryImage = document.getElementById('memoryImage');
  const memoryText = document.getElementById('memoryText');

  const memories = [
    {
      image: 'images/freya.jpg',
      text: 'The day we first met, my world changed forever.',
      position: { top: '20%', left: '30%' }
    },
    {
      image: 'images/dog.jpg',
      text: 'Every moment with you is an adventure.',
      position: { top: '50%', left: '70%' }
    },
    {
        image: 'images/freya.jpg',
        text: 'My favorite picture of you',
        position: { top: '70%', left: '20%' }
      }
  ];

  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    return star;
  }

  function createMemoryStar(memory) {
    const star = createStar();
    star.classList.add('memory-star');
    star.style.top = memory.position.top;
    star.style.left = memory.position.left;

    star.addEventListener('click', () => {
      memoryImage.src = memory.image;
      memoryText.textContent = memory.text;
      modal.style.display = 'flex';
    });

    return star;
  }

  for (let i = 0; i < 200; i++) {
    sky.appendChild(createStar());
  }

  memories.forEach(memory => {
    sky.appendChild(createMemoryStar(memory));
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});