const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#modal');
const mainContent = document.querySelector('#mainContent');
const mainHeader = document.querySelector('.main-header');

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const footer = document.querySelector('.footer');

let clickCount = 0;

document.body.classList.add('modal-open');

const getLocationData = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error', error);
  }
};

let locationData = null;

const acceptModal = async () => {
  const messages = [
    'We know everything about you.',
    'Nothing is real.',
    'Not even you.',
    'Accept that you are not real.',
  ];

  document.body.classList.add('modal-open');

  if (clickCount === 0) {
    locationData = await getLocationData();

    overlay.style.backgroundImage = 'url(./assets/ui/crack1.png)';
    const messageP = modal.querySelector('p');
    const messageText = messages[0];
    messageP.innerHTML = messageText.replace(
      'everything',
      '<span class="neon-text">everything</span>'
    );

    if (locationData) {
      const infoList = document.createElement('ul');
      infoList.id = 'infoList';
      infoList.style.listStyle = 'none';
      infoList.style.display = 'flex';
      infoList.style.flexDirection = 'column';
      infoList.style.gap = '10px';

      const locationItem = document.createElement('li');
      locationItem.textContent = `Location: ${locationData.city}, ${locationData.country_name}`;
      infoList.appendChild(locationItem);

      const ipItem = document.createElement('li');
      ipItem.textContent = `IP: ${locationData.ip}`;
      infoList.appendChild(ipItem);

      const orgItem = document.createElement('li');
      orgItem.textContent = `Organization: ${locationData.org}`;
      infoList.appendChild(orgItem);

      modal.insertBefore(infoList, modal.querySelector('.modal-button-group'));
    }
  } else if (clickCount === 1) {
    infoList.remove();
    const modalButtonGroup = document.querySelector('.modal-button-group');
    modalButtonGroup.style.display = 'none';
    overlay.style.backgroundImage = 'url(./assets/ui/crack2.png)';
    modal.querySelector('p').innerHTML = messages[1].replace(
      'Nothing',
      '<span class="neon-text">Nothing</span>'
    );

    setTimeout(() => {
      const tempText = document.createElement('p');
      tempText.id = 'tempText';
      tempText.innerHTML = messages[2].replace(
        'you',
        '<span class="neon-text">you</span>'
      );
      modal.insertBefore(tempText, modal.querySelector('.modal-button-group'));
    }, 2000);

    setTimeout(() => {
      modalButtonGroup.style.display = 'flex';
    }, 5000);
  } else if (clickCount === 2) {
    tempText.remove();
    overlay.style.backgroundImage = 'url(./assets/ui/crack3.png)';
    modal.querySelector('p').innerHTML = messages[3].replace(
      'Accept',
      '<span class="neon-text">Accept</span>'
    );
  } else {
    modal.close();
    modal.style.display = 'none';
    overlay.style.display = 'none';
    mainContent.style.display = 'block';
    mainHeader.style.display = 'block';
    footer.style.display = 'flex';
    document.body.classList.remove('modal-open');
  }

  clickCount++;
};

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-item a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

const favoriteBtn = document.getElementById('favoriteBtn');
const favoriteText = favoriteBtn.querySelector('.favorite-text');

favoriteBtn.addEventListener('click', () => {
  favoriteBtn.classList.toggle('active');

  if (favoriteBtn.classList.contains('active')) {
    favoriteText.textContent = 'Favorilerden Çıkar';
  } else {
    favoriteText.textContent = 'Favorilere Ekle';
  }
});
