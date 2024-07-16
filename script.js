// script.js
$(document).ready(function() {
    $('#requestBtn').click(function() {
        $('#page1').hide();
        $('#page2').show();
    });

    $('#addItemBtn').click(function() {
        $('.items').append(`
            <div class="item">
                <input type="text" placeholder="Item name">
                <input type="number" placeholder="Qnty">
                <button class="remove-item">➖</button>
            </div>
        `);
    });

    $(document).on('click', '.remove-item', function() {
        $(this).closest('.item').remove();
    });
});
