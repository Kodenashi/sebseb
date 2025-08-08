const gallery = document.getElementById('gallery');
const downloadAllBtn = document.getElementById('downloadAll');
const currentAgeMonths = 5; // Change this as baby grows

function createMonthCard(month) {
  const card = document.createElement('div');
  card.classList.add('month-card');

  const title = document.createElement('h2');
  title.textContent = `Month ${month}`;
  card.appendChild(title);

  const placeholder = document.createElement('div');
  placeholder.classList.add('placeholder');

  const savedImage = localStorage.getItem(`month${month}`);
  if (savedImage) {
    const img = document.createElement('img');
    img.src = savedImage;
    placeholder.appendChild(img);
  } else {
    placeholder.textContent = 'No photo yet';
  }

  card.appendChild(placeholder);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons');

  const uploadBtn = document.createElement('button');
  uploadBtn.textContent = 'Upload';
  uploadBtn.addEventListener('click', () => uploadImage(month, placeholder));

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('remove');
  removeBtn.addEventListener('click', () => removeImage(month, placeholder));

  buttonsDiv.appendChild(uploadBtn);
  buttonsDiv.appendChild(removeBtn);
  card.appendChild(buttonsDiv);

  if (month === currentAgeMonths) {
    card.style.border = '2px solid gold';
  }

  return card;
}

function uploadImage(month, placeholder) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem(`month${month}`, reader.result);
        placeholder.innerHTML = '';
        const img = document.createElement('img');
        img.src = reader.result;
        placeholder.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
  input.click();
}

function removeImage(month, placeholder) {
  localStorage.removeItem(`month${month}`);
  placeholder.innerHTML = 'No photo yet';
}

function downloadAllPhotos() {
  for (let i = 1; i <= 12; i++) {
    const savedImage = localStorage.getItem(`month${i}`);
    if (savedImage) {
      const a = document.createElement('a');
      a.href = savedImage;
      a.download = `Month${i}.png`;
      a.click();
    }
  }
}

for (let i = 1; i <= 12; i++) {
  gallery.appendChild(createMonthCard(i));
}

downloadAllBtn.addEventListener('click', downloadAllPhotos);
