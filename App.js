// app.js

document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('itemForm');
    const itemName = document.getElementById('itemName');
    const itemQuantity = document.getElementById('itemQuantity');
    const itemPrice = document.getElementById('itemPrice');
    const addItemButton = document.getElementById('addItemButton');
    const itemTableBody = document.getElementById('itemTableBody');
    const totalAmount = document.getElementById('totalAmount');
    const downloadButton = document.getElementById('downloadButton');

    let items = [];

    function updateTable() {
        itemTableBody.innerHTML = '';
        let total = 0;
        items.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-2">${item.name}</td>
                <td class="py-2">${item.quantity}</td>
                <td class="py-2">$${item.price.toFixed(2)}</td>
                <td class="py-2">$${(item.quantity * item.price).toFixed(2)}</td>
                <td class="py-2">
                    <button class="bg-red-500 text-white p-1 rounded" onclick="removeItem(${index})">Remove</button>
                </td>
            `;
            itemTableBody.appendChild(row);
            total += item.quantity * item.price;
        });
        totalAmount.textContent = total.toFixed(2);
    }

    function addItem() {
        const name = itemName.value.trim();
        const quantity = parseFloat(itemQuantity.value);
        const price = parseFloat(itemPrice.value);

        if (name && !isNaN(quantity) && quantity > 0 && !isNaN(price) && price > 0) {
            items.push({ name, quantity, price });
            updateTable();
            itemForm.reset();
        } else {
            alert('Please enter valid item details.');
        }
    }

    window.removeItem = function(index) {
        items.splice(index, 1);
        updateTable();
    }

    addItemButton.addEventListener('click', addItem);

    function downloadPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let yOffset = 10;
        doc.text('Bill Details', 10, yOffset);
        yOffset += 10;
        items.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}`, 10, yOffset);
            yOffset += 10;
        });
        doc.text(`Total Amount: $${totalAmount.textContent}`, 10, yOffset);
        doc.save('bill.pdf');
    }

    downloadButton.addEventListener('click', downloadPDF);
});