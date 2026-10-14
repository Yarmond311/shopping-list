let shoppingList = [];

const itemInput = document.getElementById('itemInput');
const quantityInput = document.getElementById('itemCostInput');
const addBtn = document.getElementById('addBtn');
const listWrapper = document.querySelector('.list-wrapper');
const ulElement = document.getElementById('shoppingListContainer');
const totalCostDisplay = document.getElementById('totalCostDisplay');
const clearBtn = document.getElementById('clearBtn');

addBtn.addEventListener('click', addItem);

itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

quantityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

function addItem() {
    const name = itemInput.value.trim();
    const cost = parseFloat(quantityInput.value) || 0;

    if (!name) {
        alert('Please enter an item name.');
        return;
    }

    const item = {
        id: Date.now(),
        name: name,
        cost: cost,
        purchased: false
    };

    shoppingList.push(item);
    itemInput.value = '';
    quantityInput.value = '';
    itemInput.focus();

    renderList();
}

function renderList() {
    ulElement.innerHTML = '';

    shoppingList.forEach(item => {
        const li = document.createElement('li');
        if (item.purchased) {
            li.classList.add('purchased');
        }

        li.innerHTML = `
            <div class="item-info" onclick="togglePurchased(${item.id})">
                <p class="item-name">${item.name} (Ksh ${item.cost.toFixed(2)})</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editItem(${item.id})">Edit</button>
                <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;

        ulElement.appendChild(li);
    });

    updateTotal();
}

function togglePurchased(id) {
    shoppingList = shoppingList.map(item => {
        if (item.id === id) {
            return { ...item, purchased: !item.purchased };
        }
        return item;
    });
    renderList();
}

function editItem(id) {
    const item = shoppingList.find(i => i.id === id);
    if (!item) return;

    const newName = prompt('Edit item name:', item.name);
    if (newName === null) return;

    const newCost = prompt('Edit cost:', item.cost);
    if (newCost === null) return;

    item.name = newName.trim() || item.name;
    item.cost = parseFloat(newCost) || item.cost;

    renderList();
}

function deleteItem(id) {
    shoppingList = shoppingList.filter(item => item.id !== id);
    renderList();
}

clearBtn.addEventListener('click', () => {
    if (shoppingList.length === 0) return;
    
    if (confirm('Are you sure you want to clear the entire list?')) {
        shoppingList = [];
        renderList();
    }
});

function updateTotal() {
    const totalCost = shoppingList.reduce((sum, item) => sum + item.cost, 0);
    totalCostDisplay.textContent = `Ksh ${totalCost.toFixed(2)}`;
}