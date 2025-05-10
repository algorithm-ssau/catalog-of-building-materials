
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


function shakeInput() {
  const input = document.getElementById("promoInput");
  input.classList.add("shake");
  setTimeout(() => input.classList.remove("shake"), 300);
}


async function checkPromo() {
  const code = document.getElementById("promoInput").value;
  const resultDiv = document.getElementById("promoResult");

  resultDiv.classList.remove('visible');

  if (!code) {
    resultDiv.textContent = "Введите промокод.";
    shakeInput();
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
      shakeInput();
    }
  } catch (error) {
    resultDiv.textContent = "Ошибка при подключении к серверу.";
    shakeInput();
  }
  setTimeout(() => {
    resultDiv.classList.add('visible');
  }, 10);
}
  

document.addEventListener('DOMContentLoaded', function() {
  // Элементы модального окна
  const modal = document.getElementById("gameModal");
  const gameLauncher = document.getElementById("gameLauncher");
  const closeBtn = document.querySelector(".close");
  
  // Элементы игры
  const gameArea = document.getElementById('game-area');
  const timerElement = document.getElementById('timer');
  const scoreElement = document.getElementById('score');
  const startBtn = document.getElementById('start-btn');
  const resultElement = document.getElementById('result');
  const finalScoreElement = document.getElementById('final-score');
  const promoCodeElement = document.getElementById('promo-code');
  const restartBtn = document.getElementById('restart-btn');
  
  // Переменные игры
  let score = 0;
  let timeLeft = 60;
  let gameInterval;
  let timerInterval;
  let isGameRunning = false;
  
  // ======================
  // Управление модальным окном
  // ======================
  
  // Открытие модального окна
  gameLauncher.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = "block";
      resetGame(); // Сброс игры при каждом открытии
  });
  
  // Закрытие модального окна
  closeBtn.addEventListener('click', function() {
      modal.style.display = "none";
      resetGame();
  });
  
  // Закрытие при клике вне окна
  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
          resetGame();
      }
  });
  
  // ======================
  // Логика игры
  // ======================
  
  // Начало игры
  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', function() {
      resetGame();
      startGame();
  });
  
  function startGame() {
      if (isGameRunning) return;
      
      isGameRunning = true;
      score = 0;
      timeLeft = 60;
      gameArea.innerHTML = '';
      resultElement.style.display = 'none';
      startBtn.style.display = 'none';
      
      updateScore();
      updateTimer();
      
      // Создаем кирпичи каждые 0.8 секунды
      gameInterval = setInterval(createBrick, 800);
      
      // Таймер
      timerInterval = setInterval(function() {
          timeLeft--;
          updateTimer();
          
          if (timeLeft <= 0) {
              endGame();
          }
      }, 1000);
  }
  
  function createBrick() {
      const brick = document.createElement('div');
      brick.className = 'brick';
      
      const maxX = gameArea.offsetWidth - 60;
      const maxY = gameArea.offsetHeight - 30;
      
      brick.style.left = Math.random() * maxX + 'px';
      brick.style.top = Math.random() * maxY + 'px';
      
      brick.addEventListener('click', function() {
          score++;
          updateScore();
          brick.remove();
          
          // Анимация при клике
          brick.style.transform = 'scale(1.2)';
          setTimeout(function() {
              brick.style.transform = 'scale(1)';
          }, 100);
      });
      
      gameArea.appendChild(brick);
  }
  
  function updateScore() {
      scoreElement.textContent = `Кирпичей: ${score}`;
  }
  
  function updateTimer() {
      timerElement.textContent = `Время: ${timeLeft} сек`;
  }
  
  function endGame() {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      isGameRunning = false;
      
      finalScoreElement.textContent = score;
      
      // Генерация промокода
      let promoCode = 'СТРОЙКА5';
      if (score >= 20) promoCode = 'СТРОЙКА7';
      if (score >= 40) promoCode = 'СТРОЙКА10';
      
      promoCodeElement.textContent = promoCode;
      resultElement.style.display = 'block';
  }
  
  function resetGame() {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      isGameRunning = false;
      gameArea.innerHTML = '';
      resultElement.style.display = 'none';
      startBtn.style.display = 'block';
      score = 0;
      timeLeft = 60;
      updateScore();
      updateTimer();
  }
  
  // Дополнительно: закрытие на Escape
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'block') {
          modal.style.display = 'none';
          resetGame();
      }
  });
});



const contactsBtn = document.getElementById('contactsBtn');
  const closeBtn = document.getElementById('closeBtn');
  const contactsPanel = document.getElementById('contactsPanel');
  const overlay = document.getElementById('overlay');

  contactsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contactsPanel.classList.add('active');
    overlay.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    contactsPanel.classList.remove('active');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    contactsPanel.classList.remove('active');
    overlay.classList.remove('active');
  });