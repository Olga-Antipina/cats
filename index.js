let store = window.localStorage;

const refreshCatsAndContent = () => {
    const content = document.getElementsByClassName('content')[0];
    content.innerHTML = '';
    api.getAllCats().then((res) => {
        store.setItem('cats', JSON.stringify(res));
        const cards = res.reduce((acc, el) => acc += generateCard(el), "");
        content.insertAdjacentHTML('afterbegin', cards);
    });
};
refreshCatsAndContent();


const refreshCatsAndContentSync = () => {
    const content = document.getElementsByClassName('content')[0];
    content.innerHTML = '';
    const cardsStr = JSON.parse(store.getItem('cats'));
    const cards = cardsStr.reduce((acc, el) => acc += generateCard(el),"");
    content.insertAdjacentHTML('afterbegin', cards);
};

const getNewIdsOfCats = () => {
    return api.getIdsOfCat().then((res) => {
        if (res.length) {
            return Math.max(...res) + 1;
        } else {
            return 1;
        }
    });
};

const getNewIdsOfCatsSync = () => {
    let res = JSON.parse(store.getItem('cats'));
    if (res.length) {
        return Math.max(...res.map((el) => el.id)) + 1;
    } else {
        return 1;
    }
};

const addCatInLocalStorage = (cat) => {
	store.setItem(
        'cats',
        JSON.stringify([...JSON.parse(store.getItem('cats')), cat]));
};

const deleteCatFromLocalStorage = (catId) => {
	store.setItem(
		'cats',
		JSON.stringify(JSON.parse(store.getItem('cats')).filter((el) => el.id != catId)));
};


document
    .querySelector('header')
    .addEventListener('click', (event) => {
        if (event.target.tagName === "BUTTON") {            
            const modalForm = document.querySelector('.create-edit-modal-form');
            modalForm.classList.add('active');
            const inputId = document.querySelector('#id');
            // getNewIdsOfCats().then((res) => {
            //     inputId.value = res;
            // });
            // inputId.setAttribute('readonly','readonly');
            inputId.value = getNewIdsOfCatsSync();
            inputId.setAttribute('readonly','readonly');
            document.forms[0].addEventListener('submit', function handler(event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                const body = Object.fromEntries(formData.entries());
                // api.addCat(body).then((res) => {
                //     console.log(res);
                //     inputId.removeAttribute('readonly');
                //     document.forms[0].reset();
                //     modalForm.classList.remove('active');
                //     refreshCatsAndContent();
                // });
                api.addCat(body).then((res) => {
                    addCatInLocalStorage(body);
                    refreshCatsAndContentSync();
                    console.log(res);
                    inputId.removeAttribute('readonly');
                    modalForm.classList.remove('active');                    
                });
                this.removeEventListener('submit', handler);
            });
            document.querySelector('.exit-modal').addEventListener('click', function handler(event) {
                document.forms[0].reset();
                modalForm.classList.remove('active');
                refreshCatsAndContent();
                this.removeEventListener('click', handler);
            });
        };
    });


document
    .getElementsByClassName('content')[0]
    .addEventListener('click', (event) => {
        if (event.target.tagName === "BUTTON") {
            if (event.target.className === "cat-card-view") {
                const showContent = document.getElementsByClassName('show-cat-card')[0];
                showContent.classList.add('active');
                showContent.innerHTML = '';
                api.showOneCat(event.target.value).then((res) => {
                    const showCatCard = generateShowCatCard(res);
                    showContent.insertAdjacentHTML('afterbegin', showCatCard);
                    document.getElementsByClassName('exit')[0].addEventListener('click', function handler(event) {
                        showContent.classList.remove('active');
                        showContent.innerHTML = '';
                        this.removeEventListener('click', handler);
                    });
                });
            }

            else if (event.target.className === "cat-card-update") {
                const modalForm = document.querySelector('.create-edit-modal-form');
                modalForm.classList.add('active');
                const inputName = document.querySelector('#name');
                const inputId = document.querySelector('#id');
                const inputAge = document.querySelector('#age');
                const inputRate = document.querySelector('#rate');
                const inputImage = document.querySelector('#image');
                const inputDescription = document.querySelector('#description');
                api.showOneCat(event.target.value).then((res) => {
                    inputName.value = `${res.name}`;
                    inputId.value = `${res.id}`;
                    inputAge.value = `${res.age}`;
                    inputRate.value = `${res.rate}`;
                    inputImage.value = `${res.image}`;
                    inputDescription.value = `${res.description}`;
                    inputName.setAttribute('readonly','readonly');
                    inputId.setAttribute('readonly','readonly');
                });
                document.forms[0].addEventListener('submit', function handler(event) {
                    event.preventDefault();
                    const formData = new FormData(event.target);
                    const body = Object.fromEntries(formData.entries());
                    api.updateCat(body).then((res) => {
                        console.log(res);
                        inputId.removeAttribute('readonly');
                        inputName.removeAttribute('readonly');
                        document.forms[0].reset();
                        modalForm.classList.remove('active');
                        refreshCatsAndContent();
                    });
                    this.removeEventListener('submit', handler);
                });
                document.querySelector('.exit-modal').addEventListener('click', function handler(event) {
                    document.forms[0].reset();
                    modalForm.classList.remove('active');
                    this.removeEventListener('click', handler);
                });
            }

            else if (event.target.className === "cat-card-delete") {
                api.deleteCat(event.target.value).then((res) => {
                    console.log(res);
                    // refreshCatsAndContent();
                    deleteCatFromLocalStorage(event.target.value);
					refreshCatsAndContentSync();
                });
            }
        }
},);
