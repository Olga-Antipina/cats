const config = {
	baseUrl: 'https://cats.petiteweb.dev/api/single/Olga-Antipina/',
};

export const getAllCats = () => {
    return fetch(`${config.baseUrl}show`).then((res) => {
        return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
};

export const addCat = (cat) => {
    return fetch(`${config.baseUrl}add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cat),
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
};

export const updateCat = (newCat) => {
    return fetch(`${config.baseUrl}update/${newCat.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCat),
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
};

export const getIdsOfCat = () => {
    return fetch(`${config.baseUrl}ids`).then((res) => {
        return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
};

export const showOneCat = (id) => {
    return fetch(`${config.baseUrl}show/${id}`).then((res) => {
        return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
};

export const deleteCat = (id) => {
    return fetch(`${config.baseUrl}delete/${id}`, {
        method: 'DELETE'
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
};

