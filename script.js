$(document).ready(function() {
    // Retrieve phone number from localStorage
    const userPhoneNumber = localStorage.getItem('userPhoneNumber');
    if (userPhoneNumber) {
        console.log('Phone Number:', userPhoneNumber);
        $('#phoneNumberDisplay').text(`Phone Number: ${userPhoneNumber}`);
    } else {
        console.error('No phone number found in localStorage');
    }

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

document.getElementById('requestForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const items = formData.getAll('items[]');
    const quantities = formData.getAll('quantities[]');
    const addInfo = formData.get('add_info');
    const userPhoneNumber = localStorage.getItem('userPhoneNumber'); // Retrieve phone number

    try {
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items, quantities, addInfo, userPhoneNumber })
        });

        const result = await response.json();

        let alertHtml = '';
        if (response.ok) {
            alertHtml = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    ${result.message}
                    <button type="button" class="border-0 btn m-0 p-1 close" data-dismiss="alert" aria-label="Close">
                        <i aria-hidden="true">&times;</i>
                    </button>
                </div>
            `;
        } else {
            alertHtml = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    ${result.message}
                    <button type="button" class="border-0 btn m-0 p-1 close" data-dismiss="alert" aria-label="Close">
                        <i aria-hidden="true">&times;</i>
                    </button>
                </div>
            `;
        }

        document.getElementById('alertContainer').innerHTML = alertHtml;
    } catch (error) {
        console.error('Error:', error);
        const alertHtml = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Failed to send request. Please try again later.
                <button type="button" class="border-0 btn m-0 p-1 close" data-dismiss="alert" aria-label="Close">
                    <i aria-hidden="true">&times;</i>
                </button>
            </div>
        `;
        document.getElementById('alertContainer').innerHTML = alertHtml;
    }
});
