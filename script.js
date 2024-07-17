// script.js
$(document).ready(function() {

    $('#addItemBtn').click(function() {
        $('.item-field-details').append(`
            <div class="item-fields">
                <input type="text" placeholder="Item name">
                <input type="number" placeholder="Qnty">
                <button class="remove-item border-0 bg-transparent"><i class="fas fa-times"></i></button>
            </div>
        `);
    });

    $(document).on('click', '.remove-item', function() {
        $(this).closest('.item-fields').remove();
    });
});
