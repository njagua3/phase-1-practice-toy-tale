document.addEventListener('DOMContentLoaded', () => {
  fetchToys();
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        renderToy(toy);
      });
    });
}

function renderToy(toy) {
  const toyCollection = document.getElementById('toy-collection');
  
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  
  const h2 = document.createElement('h2');
  h2.textContent = toy.name;
  
  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  
  const p = document.createElement('p');
  p.textContent = `${toy.likes} Likes`;
  
  const button = document.createElement('button');
  button.className = 'like-btn';
  button.id = toy.id;
  button.textContent = 'Like ❤️';
  button.addEventListener('click', () => increaseLikes(toy.id, toy.likes));
  
  cardDiv.append(h2, img, p, button);
  toyCollection.appendChild(cardDiv);
}

const toyForm = document.querySelector('.add-toy-form');
toyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const name = event.target.name.value;
  const image = event.target.image.value;
  const likes = 0;
  
  const toyData = {
    name,
    image,
    likes
  };
  
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyData)
  })
  .then(response => response.json())
  .then(newToy => {
    renderToy(newToy);
    toyForm.reset();
  });
});

function increaseLikes(toyId, currentLikes) {
  const newLikes = currentLikes + 1;
  
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: newLikes
    })
  })
  .then(response => response.json())
  .then(updatedToy => {
    const toyCard = document.querySelector(`button#${toyId}`).parentElement;
    const p = toyCard.querySelector('p');
    p.textContent = `${updatedToy.likes} Likes`;
  });
}
