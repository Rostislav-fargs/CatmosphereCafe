// Закриття і відкриття оверлеїв
function overlayOn(overlay){
    document.getElementById(overlay).style.display = 'flex';
}
function overlayOff(overlay){
    document.getElementById(overlay).style.display = 'none';
}
function overlaySwap(first, second){
    document.getElementById(first).style.display = 'none';
    document.getElementById(second).style.display = 'flex';
}

// Зміна контенту на сторінці профілю
if(window.location.pathname === "profile.html"){
    function showBlock(block, button){
        // Приховуємо всі блоки
        document.getElementById('profile-acc').style.display = 'none';
        document.getElementById('client-bonuses').style.display = 'none';
        document.getElementById('last-orders').style.display = 'none';
        // Відркиваємо блок, кнопка якого була натиснута
        document.getElementById(block).style.display = 'block';
        // Знімаємо з кнопок активний стан
        let buttons = document.querySelectorAll('.profile-btn');
        buttons.forEach(function(btn) {
            btn.classList.remove('active-p');
        });
        // Надаємо натиснутій кнопці активний стан
        button.classList.add('active-p');
    }
}

// Drop list вакансії
document.addEventListener('DOMContentLoaded', function () {
    // Отримуємо список всіх елементів вакансій
    const vacancies = document.querySelectorAll('.vacancy');

    // Перебираємо кожну вакансію
    vacancies.forEach(function (vacancy) {
        // Отримуємо назву вакансії
        let vacancyTitle = vacancy.querySelector('.name-vacancy');

        // Отримуємо контент вакансії
        let vacancyContent = vacancy.querySelector('.content-vacancy');

        // Додаємо обробник подій кліку на назву вакансії
        vacancyTitle.addEventListener('click', function () {
            // Змінюємо відображення контенту вакансії
            if (vacancyContent.style.display === 'block') {
                vacancyContent.style.display = 'none';
                
                // Перевертання трикутника у заголовку вакансії
                vacancyTitle.querySelector('img').style.transform = "rotate(0deg)"
            } else {

                // Показуємо контент поточної вакансії
                vacancyContent.style.display = 'block';

                // Перевертання трикутника у заголовку вакансії
                vacancyTitle.querySelector('img').style.transform = "rotate(180deg)"
            }
        });
    });
});


//Додавання у меню товарів
if(window.location.pathname === "/cafe-menu.html") {
    document.addEventListener('DOMContentLoaded', () => {
        const menu = document.getElementById('cafe-menu');//Отримуємо блок меню
        let current_category = 'all'; // За замовчуванням поточною категорією є всі напої
        let current_ukr_name = 'НАПОЇ'; // За замовчуванням поточною категорією є всі напої
        let sortingDirection = 'none'; // Змінна, що вказує на напрямок сортування, за зростанням (asc) або за спаданням (desc)
        let currentPage = 1; // Поточна сторінка
        const itemsPerPage = 9; // Кількість позицій на сторінку
        
        // Функція очищення меню
        function clearMenu() {
            while (menu.firstChild) {
                menu.removeChild(menu.firstChild);
            }
        }
        
        // Очищуємо сторінки
        function clearPagination() {
            while (pagination.firstChild) {
                pagination.removeChild(pagination.firstChild);
            }
        }
        
        // Створення клітинки позиції меню
        function createProductCard(drink) {
            const product_card = document.createElement('div');
            product_card.className = 'product-card';
    
            const drink_photo = document.createElement('img');
            drink_photo.src = drink.photo;
            drink_photo.alt = drink.name;
            drink_photo.className = 'product-image';
            product_card.appendChild(drink_photo);
    
            const product_info = document.createElement('div');
            product_info.className = 'product-info';
            product_info.style.display = 'flex';
            product_info.style.flexDirection = 'column';
            product_info.style.justifyContent = 'space-between';
            product_card.appendChild(product_info);
    
            const name = document.createElement('h4');
            name.textContent = drink.name;
            name.className = 'third-block-title';
            product_info.appendChild(name);
    
            const volume_ml = document.createElement('p');
            volume_ml.textContent = drink.volume_ml;
            volume_ml.className = 'standart-text';
            product_info.appendChild(volume_ml);
    
            const energy_value = document.createElement('p');
            energy_value.textContent = drink.energy_value;
            energy_value.className = 'standart-text';
            product_info.appendChild(energy_value);
    
            const product_price = document.createElement('div');
            product_price.className = 'product-price line-spbw-div';
            product_info.appendChild(product_price);
    
            const price = document.createElement('span');
            price.textContent = drink.price;
            product_price.appendChild(price);
    
            const cart_icon = document.createElement('button');
            cart_icon.className = 'cart-icon';
            product_price.appendChild(cart_icon);
    
            const cart_photo = document.createElement('img');
            cart_photo.src = '../Picture/cart-brown.svg';
            cart_photo.alt = 'buy';
            cart_icon.appendChild(cart_photo);
    
            menu.appendChild(product_card);
        }
        
        // Фільтр категорій
        function showCategory(category, ukr_name, page = 1) {
            // Зберігаємо категорію і назву, як поточні
            current_category = category;
            current_ukr_name = ukr_name;

            // Очищення меню
            clearMenu();
            // Отримуємо дані про меню з json
            fetch('../jsonData/drinks.json')
                .then(response => response.json())
                .then(data => {
                    // Стоврюємо масив, в який зберемо обрану категорію
                    let allDrinks = [];
                    // Якщо категорія загальна(Напої)
                    // Буде збережено весь json
                    if (category === 'all') {
                        Object.values(data).forEach(drinks => {
                            Object.values(drinks).forEach(drink => {
                                allDrinks.push(drink);
                            });
                        });
                    } 
                    // Інакше обираємо категорію з data 
                    // Зберігаємо її в allDrinks
                    else {
                        allDrinks = Object.values(data[category]);
                    }
                    
                    // Сортування за ціною
                    allDrinks.sort((a, b) => {
                        const nameA = a.price;
                        const nameB = b.price;
                        // Якщо зростання
                        if(sortingDirection === 'asc'){
                            return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
                        }
                        // Якщо спадання
                        else{
                            return nameA > nameB ? -1 : (nameA < nameB ? 1 : 0);
                        }
                    });
                    

                    //Сторінки 
                    const totalPages = Math.ceil(allDrinks.length / itemsPerPage);
                    const startIndex = (page - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    const drinksToShow = allDrinks.slice(startIndex, endIndex);
                    
                    // виведення/створення позицій меню на сайт
                    drinksToShow.forEach(drink => {
                        createProductCard(drink);
                    });
                    
                    // Заголовок поточної категорії
                    if (category === 'all') {
                        document.getElementById('current_category').textContent = 'НАПОЇ';
                    } else {
                        document.getElementById('current_category').textContent = ukr_name;
                    }
                    
                    // Створення сторінок
                    createPagination(totalPages, category, ukr_name);
                })
                .catch(error => console.error('Error loading JSON:', error));
        }
    
        function createPagination(totalPages, category, ukr_name) {
            clearPagination();
    
            if(totalPages != 1){
                for (let i = 1; i <= totalPages; i++) {
                    const button = document.createElement('button');
        
                    if(i == totalPages){
                        button.textContent = i;
                    }
                    else{
                        button.textContent = `${i} ,`;
                    }
                    button.className = (i === currentPage) ? 'active' : '';
                    button.addEventListener('click', () => {
                        currentPage = i;
                        showCategory(category, ukr_name, currentPage);
                        updateActiveButton(i); 
                    });
                    pagination.appendChild(button);
                }
            }
        }
        
        // Надаємо індексу поточної сторінку активний стиль
        function updateActiveButton(activePage) {
            const buttons = pagination.getElementsByTagName('button');
            for (let button of buttons) {
                if (parseInt(button.textContent) === activePage) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        }
    
        
        // Кнопки для виведення категорій напоїв
        document.getElementById('special_drinks').addEventListener('click', () => showCategory('Special_drinks', 'СПЕЦІАЛЬНІ НАПОЇ'));
        document.getElementById('juice_and_water_drinks').addEventListener('click', () => showCategory('Juice_and_Water', 'СОКИ/ВОДА'));
        document.getElementById('cocktails_drinks').addEventListener('click', () => showCategory('Cocktails', 'КОКТЕЙЛІ'));
        document.getElementById('tea_and_chocolate_drinks').addEventListener('click', () => showCategory('Tea_and_Chocolate', 'ЧАЙ/ШОКОЛАД'));
        document.getElementById('coffee_drinks').addEventListener('click', () => showCategory('Coffee', 'КАВА'));
        // Кнопка для виведення всіх напоїв
        document.getElementById('all_drinks').addEventListener('click', () => showCategory('all'));
    
        // Кнопки для зміни напрямку сортування
        document.getElementById('sort_asc').addEventListener('click', () => {
            sortingDirection = 'asc';
            showCategory(current_category, current_ukr_name)
        });
        document.getElementById('sort_desc').addEventListener('click', () => {
            sortingDirection = 'desc';
            showCategory(current_category, current_ukr_name)
        });
    
        // Показати всі напої за замовчуванням
        showCategory('all');
    });
}

// Слайдер із анкетами котів
if(window.location.pathname === "/index.html" || window.location.pathname === "/cats.html"){
    document.addEventListener('DOMContentLoaded', function () {
        // Завантаження JSON-файлу
        fetch('../jsonData/cats.json')
            .then(response => response.json())
            .then(data => {
                // Поміщаємо дані з json в cats
                const cats = data;
                let currentCatIndex = 0;//Для індексації анкет
                const catKeys = Object.keys(cats);
    
                // Функція для оновлення картки кота
                function updateCatCard(cat) {
                    document.getElementById('cat-name').innerText = cat.name;
                    document.getElementById('cat-sex').innerText = `Стать: ${cat.sex}`;
                    document.getElementById('cat-age').innerText = `Вік: ${cat.age}`;
                    document.getElementById('cat-character').innerText = `Характер: ${cat.character}`;
                    document.getElementById('cat-description').innerText = cat.description;
                    if(window.location.pathname === "/cats.html"){
                        document.getElementById('cat-story').innerText = cat.story;
                    };
                    document.getElementById('cat-photo').src = cat.photo;
                }
                

                // Завантаження першого кота
                updateCatCard(cats[catKeys[currentCatIndex]]);

                // Іконки-кнопки на сторінці з котами
                // Дозволяють відкрити обраного кота, якщо він є у json файлі
                if(window.location.pathname === "/cats.html"){
                    // Додаємо обробники подій для кнопок
                    document.querySelectorAll('.cat').forEach(button => {
                        button.addEventListener('click', function () {
                            const catKey = this.getAttribute('data-cat');
                            updateCatCard(cats[catKey]);
        
                            // Плавний перехід до слайдера
                            document.getElementById('cat-slider').scrollIntoView({
                                behavior: 'smooth',
                                block: "center"
                            });
                        });
                    });
                }

                // Обробники подій для кнопок
                // Прогортування ліворуч
                document.getElementById('left-slide-btn').addEventListener('click', function() {
                    currentCatIndex = (currentCatIndex === 0) ? catKeys.length - 1 : currentCatIndex - 1;
                    updateCatCard(cats[catKeys[currentCatIndex]]);
                });
                // Прогортування праворуч 
                document.getElementById('right-slide-btn').addEventListener('click', function() {
                    currentCatIndex = (currentCatIndex === catKeys.length - 1) ? 0 : currentCatIndex + 1;
                    updateCatCard(cats[catKeys[currentCatIndex]]);
                });
            });
    });
};
