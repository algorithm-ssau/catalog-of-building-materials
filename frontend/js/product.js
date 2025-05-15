let productId = parseInt(new URLSearchParams(window.location.search).get('productId'));

const url = `http://127.0.0.1:8080/product/${productId}`;

// Функция для выполнения GET-запроса
async function getUserData() {
  try {
    const response = await fetch(url, {method: "GET", headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }});

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

        productNameContainer.innerHTML = userData['name'];
        productCostContainer.innerHTML = userData['price'] + 'руб.';
        productImageContainer.src = userData['imageURL'];

        str = `<p><b>Описание:</b> ${userData.description}</p>`+
            `<p><b>Производитель:</b> ${userData.manufacturer}</p>`+
            `<p><b>Категория:</b> ${userData.category}</p>`;
        

        userData.attributes.forEach(attribute => {
            str += `<p><b>${attribute.name}:</b> ${attribute.value}</p>`
        });    

        dataContainer.insertAdjacentHTML('beforeend', str);

        if(userData.stockQuantity == 0) document.querySelector('.button').hidden = true;

        document.querySelector('.button').onclick = function(e){
            let storage = localStorage.getItem('cart');
            let array = [];
            if(storage == null) {
              array.push(productId);
              localStorage.setItem('cart', JSON.stringify(array));
            }
            else{
              array = JSON.parse(localStorage.getItem('cart'));
              if (!array.includes(productId)) {
                array.push(productId);
              }
              localStorage.setItem('cart', JSON.stringify(array));
            }
            e.currentTarget.querySelector('.button__text').innerHTML = 'Добавлено';
            e.currentTarget.onclick = null;
        }
    } else {
      const dataContainer = document.getElementById('dataContainer');
      dataContainer.innerHTML = '<p>Не удалось загрузить данные. Пусто</p>';
    }
  }

document.addEventListener('DOMContentLoaded', function() {
    displayUserData();
});