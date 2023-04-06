const generateCard = (cat) => {
    return `<div class="cat-card">
    <img src="${cat.image}">
    ${cat.name}
    <div class="cat-card-btns">
    <button class="cat-card-view" value="${cat.id}">Посмотреть</button>
    <button class="cat-card-update" value="${cat.id}">Изменить</button>
    <button class="cat-card-delete" value="${cat.id}">Удалить</button>
    </div>
    </div>`;
};



