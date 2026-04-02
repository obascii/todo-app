const form = document.querySelector('.form');
const input = document.querySelector('.form__field');
const list = document.querySelector('.list');

const items = []

// Save items to local storage
const saveToLocalStorage = () => {
    localStorage.setItem('todoItems', JSON.stringify(items));
};

// Load items from local storage
const loadFromLocalStorage = () => {
    const storedItems = localStorage.getItem('todoItems');
    return storedItems ? JSON.parse(storedItems) : [];
};


const count = function() {
    return items.filter(e => {
        if(!e.isDone) {
            return e;
        }
    }).length;
}

const render = function(arr) {
    let res = count();
    let markup = `
    ${arr.map((item, i) => {
        return `
        <li class="list__item ${item.isDone? 'list__item--completed' : ''}" draggable="true">
            <label for="check-id-${i}" class="checkbox">
                <input type="checkbox" id="check-id-${i}" ${item.isDone? 'checked' : ''}>
                <span class="check"></span>
            </label>
            <span>${item.task}</span>
            <button class="btn btn--close"></button>
        </li>
        `;
    }).join('')}

    <li class="list__footer">
        <span id="item-left">${res} item${res>1?'s':''} left</span>
        <ul>
            <li onclick="showAll()">All</li>
            <li onclick="filterActive()">Active</li>
            <li onclick="filterCompleted()">Completed</li>
        </ul>
        <span onclick="clearCompleted()">Clear completed</span>
    </li>
    `;
    list.innerHTML = '';
    if(arr.length === 0) markup = '';
    list.insertAdjacentHTML('afterbegin', markup);

    const checkbox = document.querySelectorAll('[id^=check-id]');
    checkbox.forEach(check => {
        check.addEventListener('change', () => {
            if(check.checked === true){
                arr[+check.id.slice(-1)].isDone = true;
                check.closest('.list__item').classList.toggle('list__item--completed');
                res -= 1;
                document.querySelector('#item-left').innerHTML = `${res} item${res>1?'s':''} left`;     
            } else {
                arr[+check.id.slice(-1)].isDone = false;
                check.closest('.list__item').classList.toggle('list__item--completed');
                res += 1;
                document.querySelector('#item-left').innerHTML = `${res} item${res>1?'s':''} left`;
            }

            saveToLocalStorage();
        })
    })

    // Select all items with the class `.list__item` for drag-and-drop
    const items = [...list.querySelectorAll('.list__item')];
    const footerItem = list.querySelector('.list__footer');

    items.forEach(item => {
        item.setAttribute("draggable", true); // Make items draggable
        item.addEventListener("dragstart", () => {
            setTimeout(() => item.classList.add("dragging"), 0);
        });
        item.addEventListener("dragend", () => item.classList.remove("dragging"));
    });

    const sortList = (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');

        // Select all `.list__item` siblings except the dragging item
        const siblings = [...list.querySelectorAll(".list__item:not(.dragging)")];
        
        // Find the correct position to insert the dragging item
        const nextSibling = siblings.find(sibling => {
            return e.clientY < sibling.getBoundingClientRect().top + sibling.offsetHeight / 2;
        });

        // Stop if attempting to place the dragging item before or after the footer item
        if (!nextSibling || nextSibling === footerItem) return;

        // Insert the dragging item before the found sibling or at the end of `.list__item` elements
        list.insertBefore(draggingItem, nextSibling);
    };

    // Attach drag event listeners to the list container
    list.addEventListener("dragover", sortList);
    list.addEventListener("dragenter", e => e.preventDefault());
}

document.addEventListener('DOMContentLoaded', () => {
    // Load items from local storage on page load
    const storedItems = loadFromLocalStorage();
    items.push(...storedItems);  // Populate items array with stored data
    render(items);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!input.value) return;
    const todo = {
        task: input.value,
        isDone: false
    }

    items.push(todo);
    input.value = '';

    saveToLocalStorage();
    render(items);
})

list.addEventListener('click', (e) => {
    if(e.target.className === "btn btn--close") {
        const parent = e.target.closest('.list__item');
        const check = parent.querySelector('[id^=check-id]');
        items.splice(+check.id.slice(-1), 1);

        saveToLocalStorage();
        render(items);
    }
})

const filterCompleted = function(arr) {
    arr=items;
    const res = arr.filter(e => {
        if(e.isDone) {
            return e;
        }
    })
    if(res.length===0) return
    render(res);
}

const filterActive = function(arr) {
    arr=items;
    const res = arr.filter(e => {
        if(!e.isDone) {
            return e;
        }
    })
    if(res.length===0) return
    render(res);
}

const showAll = function(arr) {
    arr=items;
    render(arr);
}

const clearCompleted = function(arr) {
    arr=items;
    for(let i=arr.length - 1; i >= 0; i--){
        if(arr[i].isDone) {
            arr.splice(i, 1)
        }
    }

    saveToLocalStorage();
    render(arr);
}

