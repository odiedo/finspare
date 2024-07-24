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




// Audio Script
let mediaRecorder;
let audioChunks = [];
let audioBlob;

document.getElementById('startRecordingBtn').addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const startRec = document.getElementById('startRecordingBtn');
    const stopRec = document.getElementById('stopRecordingBtn');
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();
    startRec.style.display = 'none';
    stopRec.style.display = 'block';
    stopRec.style.animation = 'scale infinite 2s';
    

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById('audioPlayback').src = audioUrl;
        document.getElementById('audioPlayback').style.display = 'block';
        document.getElementById('audioMessage').value = audioBlob;

        audioChunks = [];
    };

    document.getElementById('startRecordingBtn').disabled = true;
    document.getElementById('stopRecordingBtn').disabled = false;
});

document.getElementById('stopRecordingBtn').addEventListener('click', () => {
    mediaRecorder.stop();
    const startRec = document.getElementById('startRecordingBtn');
    const stopRec = document.getElementById('stopRecordingBtn');
    const  submitReq = document.getElementById('submitReq');
    stopRec.style.display = 'none';
    startRec.style.display = 'block';
    submitReq.style.display = 'block';
    startRec.style.animation = 'none';
    stopRec.style.animation = 'none';

    startRec.disabled = false;
    stopRec.disabled = true;
});

document.getElementById('requestForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const items = formData.getAll('items[]');
    const quantities = formData.getAll('quantities[]');
    const addInfo = formData.get('add_info');
    // retrieve phone number from localstorage
    const userPhoneNumber = localStorage.getItem('userPhoneNumber');
    
    // Convert audioBlob to Base64
    let audioBase64 = '';
    if (audioBlob) {
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = function() {
            audioBase64 = reader.result.split(',')[1];
            
            sendFormData({ items, quantities, addInfo, userPhoneNumber, audioBase64 });
        };
    } else {
        sendFormData({ items, quantities, addInfo, userPhoneNumber, audioBase64 });
    }
});

async function sendFormData(data) {
    try {
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
}
