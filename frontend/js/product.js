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
      const productNameContainer = document.getElementById('product_name');
      const productCostContainer = document.getElementById('product_cost');
      const productImageContainer = document.getElementById('product_image');
      const dataContainer = document.getElementById('product_data');
      dataContainer.innerHTML = '';

      productNameContainer.innerHTML = userData['name']
      productCostContainer.innerHTML = userData['price']
      productImageContainer.src = userData['imageURL']

      for (const key in userData) {
        if (userData.hasOwnProperty(key) && ['name', 'id', 'price', 'imageURL'].includes(key)) {
          const value = userData[key];

          const paragraph = document.createElement('p');
          const strong = document.createElement('strong');
          strong.textContent = key + ': ';
          const span = document.createElement('span');
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