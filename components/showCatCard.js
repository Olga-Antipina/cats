const generateShowCatCard = (cat) => {
    return `<img src="${cat.image}">
    <div class="show-cat-card-info">
    ID: ${cat.id}<br>
    Имя: ${cat.name}<br>
    Возраст: ${cat.age}<br>
    Рейтинг: ${cat.rate}<br>
    Любимчик: ${cat.favorite ? "да" : "нет"}<br>
    Описание: ${cat.description}<br>
    <button type="button" class="exit">Закрыть</button>
    </div>`;
};
