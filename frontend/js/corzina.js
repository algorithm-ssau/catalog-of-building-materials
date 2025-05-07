let cartData = [];

async function getProducts(){
    let str = localStorage.getItem('cart');
    if(str == null) return;
    let idList = JSON.parse(str);
    let obj = {"list": idList};
    let url = 'http://127.0.0.1:8080/cart';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(obj),
        credentials: 'include'
    });
    if(response.ok){
       let body = await response.json();
       body.products.forEach(product => {
          cartData.push({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              stockQuantity: product.stockQuantity,
              image: product.imageURL
          });
       });
       renderCart();
    }
}

document.querySelector('.checkout-btn').onclick = async function(e){
    if(cartData.length == 0) return;
    let array = [];
    cartData.forEach(elem=>{
      array.push({
        "productId": elem.id,
        "quantity": elem.quantity
      });
    });
    let body = {"products": array};
    let url = 'http://127.0.0.1:8080/buy-products';
    let response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(body),
        credentials: 'include'
    });
    if(response.ok){
      let res = await response.text();
      if(res == 'true'){
        cartData = [];
        localStorage.removeItem('cart');
        renderCart();
      }
    }
}

getProducts();
  
  function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const itemCountElement = document.getElementById('itemCount');
  
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    let totalCount = 0;
  
    cartData.forEach(item => {
      totalPrice += item.price * item.quantity;
      totalCount += item.quantity;
  
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-image">
      <div class="item-details">
      <div class="item-main-row">
      <div class="item-name">${item.name}</div>
      <div class="item-price">${item.price} ₽</div>
      <div class="quantity-control">
        <button class="quantity-btn minus" data-id="${item.id}">-</button>
        <input type="text" class="quantity-value" value="${item.quantity}" readonly>
        <button class="quantity-btn plus" data-id="${item.id}">+</button>
      </div>
      </div>
       </div>
       <button class="remove-btn" data-id="${item.id}">✕</button>
       `;

      cartItemsContainer.appendChild(itemElement);
      
    });
  
    totalPriceElement.textContent = `${totalPrice} ₽`;
    itemCountElement.textContent = totalCount;
  
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const item = cartData.find(i => i.id === id);
        if (item && item.quantity > 1) {
          item.quantity--;
          renderCart();
        }
      });
    });
  
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const item = cartData.find(i => i.id === id);
        if (item && item.quantity < item.stockQuantity) {
          item.quantity++;
          renderCart();
        }
      });
    });
  
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const index = cartData.findIndex(i => i.id === id);
        if (index !== -1) {
          let array = JSON.parse(localStorage.getItem('cart'));
          let newArray = [];
          array.forEach(elem=>{
            if(elem != cartData[index].id) newArray.push(elem);
          });
          localStorage.setItem('cart', JSON.stringify(newArray));
          cartData.splice(index, 1);
          renderCart();
        }
      });
    });
  }

async function checkPromo() {
  const code = document.getElementById("promoInput").value;
  const resultDiv = document.getElementById("promoResult");

  resultDiv.classList.remove('visible');

  if (!code) {
    resultDiv.textContent = "Введите промокод.";
    resultDiv.classList.add('visible');
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/promocodes/${code}`);

    if (response.ok) {
      const data = await response.json();
      resultDiv.textContent = `Скидка: ${data.discount_percent}%`;
    } else {
      const err = await response.json();
      resultDiv.textContent = err.message || "Промокод не найден.";
    }
  } catch (error) {
    resultDiv.textContent = "Ошибка при подключении к серверу.";
  }
  setTimeout(() => {
    resultDiv.classList.add('visible');
  }, 10);
}
  