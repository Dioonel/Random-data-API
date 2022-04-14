////////////////////////////////////////////////////////
const formPost = document.getElementById('form2');
formPost.addEventListener('submit', createItem);
////////////////////////////////////////////////////////
const formDelete = document.getElementById('form3');
formDelete.addEventListener('submit', deleteOne);
////////////////////////////////////////////////////////
const formUpdate = document.getElementById('form4');
formUpdate.addEventListener('submit', updateOne);
////////////////////////////////////////////////////////

const URL = `http://localhost:3000/api/products`;

function searchOne(){
    const id = document.getElementById('idSearch').value;
    const form = document.getElementById('form1');
    form.action = `${URL}/${id}`;
}

async function createItem(){
    const id = 'WIP';

    let obj = {
        name: document.getElementById('namePost').value,
        price: document.getElementById('pricePost').value,
        image: document.getElementById('imagePost').value,
        id: id
    };

    obj = JSON.stringify(obj);

    const response = await doPost(URL, obj);
    postMsg(response);
    formPost.reset();
}

async function deleteOne(){
    const id = document.getElementById('idDelete').value;

    const response = await doDelete(`${URL}/${id}`);
    deleteMsg(response);
    formDelete.reset();
}

async function updateOne(){
    const id = document.getElementById('idUpdate').value;

    const name = {prop: 'name', value: document.getElementById('nameUpdate').value};
    const price = {prop: 'price', value: document.getElementById('priceUpdate').value};
    const image = {prop: 'image', value: document.getElementById('imageUpdate').value};

    let obj = {};
    let array = [name, price, image];

    for (let b of array){
        if(b.value != ""){
            obj = {
                ...obj,
                [b.prop]: b.value,
            }
        }
    }

    obj = JSON.stringify(obj);

    const response = await doUpdate(`${URL}/${id}`, obj);
    updateMsg(response);
    formUpdate.reset();
}

async function doPost(url, ob){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: ob
    });
    return response.json();
}

async function doDelete(url){
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'}
    });
    return response.json();
}

async function doUpdate(url, ob){
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ob
    });
    return response.json();
}

let postMsg = (data) => {
    let span1 = document.querySelector('.postMsg');
    let span2 = document.querySelector('.showRes');
    span1.innerHTML = `<strong>${data.message}</strong>`;
    span1.style.display = 'inline';
    span2.innerHTML = `<strong>Item:</strong> <i>${data.data.name}</i>  -  <strong>Price:</strong> <i>${data.data.price}</i>  -  <strong>ImageURL:</strong> <i>${data.data.image}</i>  -  <strong>ID:</strong> <i>${data.data.id}</i>`;
    span2.style.display = 'inline';
}

let deleteMsg = (data) => {
    let span = document.querySelector('.delMsg');
    span.innerHTML = `<strong>${data.message}</strong>`;
    span.style.display = 'inline';
}

let updateMsg = (data) => {
    let span = document.querySelector('.updMsg');
    span.innerHTML = `<strong>${data.message}</strong>`;
    span.style.display = 'inline';
}