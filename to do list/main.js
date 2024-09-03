const contenedor = document.querySelector('.contenedor');  
const agregar = document.querySelector('#Agregar');  
const input = document.querySelector('#input');  
const ul = document.querySelector('ul');  
const empty = document.querySelector('.empty');  

const guardarStorage = () => {  
    const items = Array.from(ul.children).map(li => li.firstChild.textContent);  
    localStorage.setItem('text', JSON.stringify(items));  
}  

agregar.addEventListener('click', (e) => {  
    e.preventDefault();  
    const text = input.value;  
    if (text !== '') {  
        const li = document.createElement('li');  
        const p = document.createElement('p');  

        p.textContent = text;  
        li.appendChild(p);  
        li.appendChild(eliminarBoton());  
        ul.appendChild(li);  

        input.value = '';  
        guardarStorage();  
        empty.style.display = "none";  
    }  
});  

function eliminarBoton() {  
    const boton = document.createElement('button');  
    boton.textContent = "X";  
    boton.className = "btn-delete";  

    boton.addEventListener('click', (e) => {  
        const item = e.target.parentElement;  
        ul.removeChild(item);  

        const items = document.querySelectorAll('li');  
        if (items.length === 0) {  
            empty.style.display = "block";  
        }  

        guardarStorage(); 
    })  
    return boton;  
}  

window.addEventListener('DOMContentLoaded', () => {  
    const items = JSON.parse(localStorage.getItem('text'));  
    if (items) {  
        items.forEach(text => {  
            const li = document.createElement('li');  
            const p = document.createElement('p');  

            p.textContent = text;  
            li.appendChild(p);  
            li.appendChild(eliminarBoton());  
            ul.appendChild(li);  
        });    
        empty.style.display = items.length === 0 ? "block" : "none";  
    }  
});