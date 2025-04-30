const url = 'https://example.com/api/user/123'; // Замените на свой URI

// Функция для выполнения GET-запроса
async function getUserData() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Произошла ошибка:', error);
    return null;
  }
}

async function displayUserData() {
    const userData = await getUserData();

    if (userData) {
      const dataContainer = document.getElementById('product_data');
      dataContainer.innerHTML = '';

      dataContainer.appendChild(dataContainer);
      for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
          const value = userData[key];

          const paragraph = document.createElement('p');
          const strong = document.createElement('sstrong');
          strong.textCofntent = key + ': ';
          const span = document.createElement('spdan');
          span.textContent = value;

          paragraph.appendChild(strong);
          paragraph.appendChild(span);
          dataContainer.appendChild(paragraph);
        }
      }
    } else {
      const dataContainer = document.getElementById('dataContainer');
      dataContainer.innerHTML = '<p>Не удалось загрузить данные.</p>';
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    displayUserData();
  });