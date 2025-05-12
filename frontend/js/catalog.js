let div = document.querySelector('.catalog');

let products = new URLSearchParams(window.location.search).get('products');

let productList = [];

async function getProducts(){
    let url = 'http://127.0.0.1:8080/products';
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    if(response.ok){
        let body = await response.text();
        let json = JSON.parse(body);
        productList = json.products;
        productList.forEach(element => {
            if(products == 'all'){
                let str = 
                '<div class="product">'+
                    `<img class="img" src="${element.imageURL}"></img>`+
                    `<p class="title">${element.name}</p>`+
                    `<p class="price">${element.price} р.</p>`+
                    `<p class="product_id" style="display: none;">${element.id}</p>`+
                '</div>';
                div.insertAdjacentHTML('beforeend', str);
            }
            else if(products == 'paint'){
                if(element.category == 'Лакокрасочные'){
                    let str = 
                    '<div class="product">'+
                        `<img class="img" src="${element.imageURL}"></img>`+
                        `<p class="title">${element.name}</p>`+
                        `<p class="price">${element.price} р.</p>`+
                        `<p class="product_id" style="display: none;">${element.id}</p>`+
                    '</div>';
                    div.insertAdjacentHTML('beforeend', str);
                }
            }
            else if(products == 'wallpaper'){
                if(element.category == 'Обои'){
                    let str = 
                    '<div class="product">'+
                        `<img class="img" src="${element.imageURL}"></img>`+
                        `<p class="title">${element.name}</p>`+
                        `<p class="price">${element.price} р.</p>`+
                        `<p class="product_id" style="display: none;">${element.id}</p>`+
                    '</div>';
                    div.insertAdjacentHTML('beforeend', str);
                }
            }
            else if(products == 'tile'){
                if(element.category == 'Плитка'){
                    let str = 
                    '<div class="product">'+
                        `<img class="img" src="${element.imageURL}"></img>`+
                        `<p class="title">${element.name}</p>`+
                        `<p class="price">${element.price} р.</p>`+
                        `<p class="product_id" style="display: none;">${element.id}</p>`+
                    '</div>';
                    div.insertAdjacentHTML('beforeend', str);
                }
            }
            else if(products == 'glue'){
                if(element.category == 'Клей'){
                    let str = 
                    '<div class="product">'+
                        `<img class="img" src="${element.imageURL}"></img>`+
                        `<p class="title">${element.name}</p>`+
                        `<p class="price">${element.price} р.</p>`+
                        `<p class="product_id" style="display: none;">${element.id}</p>`+
                    '</div>';
                    div.insertAdjacentHTML('beforeend', str);
                }
            }
            else if(products == 'floor'){
                if(element.category == 'Пол'){
                    let str = 
                    '<div class="product">'+
                        `<img class="img" src="${element.imageURL}"></img>`+
                        `<p class="title">${element.name}</p>`+
                        `<p class="price">${element.price} р.</p>`+
                        `<p class="product_id" style="display: none;">${element.id}</p>`+
                    '</div>';
                    div.insertAdjacentHTML('beforeend', str);
                }
            }
            else if(products == 'mixtures'){
                if(element.category == 'Смеси'){
                    let str = 
                    '<div class="product">'+
                        `<img class="img" src="${element.imageURL}"></img>`+
                        `<p class="title">${element.name}</p>`+
                        `<p class="price">${element.price} р.</p>`+
                        `<p class="product_id" style="display: none;">${element.id}</p>`+
                    '</div>';
                    div.insertAdjacentHTML('beforeend', str);
                }
            }
        });

        let divs = document.querySelectorAll('.product');
        divs.forEach(div => {
            div.onclick = function(e){
                let id = e.currentTarget.querySelector('.product_id').innerHTML;
                window.location.href = `product.html?productId=${id}`;
            }
        });
    }
}

getProducts();