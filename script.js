// script.js
$(document).ready(function() {
    $('#addItemBtn').click(function() {
        $('.item-field-details').append(`
            <div class="item-fields">
                <input type="text" name="items[]" placeholder="Item name">
                <input type="number" name="quantities[]" placeholder="Qnty">
                <button class="remove-item border-0 bg-transparent"><i class="fas fa-times"></i></button>
            </div>
        `);
    });

    $(document).on('click', '.remove-item', function() {
        $(this).closest('.item-fields').remove();
    });
});

document.getElementById('requestForm').addEventListener('submit', async function (event){
    event.preventDefault();

    const formData = new formData(this);
    const items = formData.getAll('items[]');
    const quantities = formData.getAll('quantities[]');
    const addInfo = formData.get('add_info');

    const response = await fetch('./netlify/functions/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items, quantities, addInfo })
    });

    if (response.ok) {
        const result = await response.json();
        alert(result.message);
    } else {
        const errorResult = await response.json();
        console.error('Error sending spare request email:', errorResult);
        alert('Failed to send request, kindly try again');
    }
});


