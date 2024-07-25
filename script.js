$(document).ready(function() {
    // Retrieve phone number from localStorage
    const userPhoneNumber = localStorage.getItem('userPhoneNumber');
    if (userPhoneNumber) {
        console.log('Phone Number:', userPhoneNumber);
        $('#phoneNumberDisplay').text(`Phone Number: ${userPhoneNumber}`);
    } else {
        console.error('No phone number found in localStorage');
    }

    // Add item button functionality
    $('#addItemBtn').click(function() {
        $('.item-field-details').append(`
            <div class="item-fields">
                <input type="text" name="items[]" placeholder="Item name">
                <input type="number" name="quantities[]" placeholder="Qnty">
                <button type="button" class="remove-item border-0 bg-transparent"><i class="fas fa-times"></i></button>
            </div>
        `);
    });

    // Remove item button functionality
    $(document).on('click', '.remove-item', function() {
        $(this).closest('.item-fields').remove();
    });

    // Phone number modal handling
    document.querySelectorAll('.submitPhoneNumber').forEach(button => {
        button.addEventListener('click', function() {
            const phoneNumber = button.id === 'submitPhoneNumber' ? document.getElementById('userPhoneNumber').value : document.getElementById('userPhoneNumberVoice').value;
            const alertContainer = document.getElementById('alertContainerReq');
            const alertContainerOne = document.getElementById('alertContainerReqOne');
            if (phoneNumber) {
                localStorage.setItem('userPhoneNumber', phoneNumber);
                const voice = document.getElementById('voice').checked || document.getElementById('voiceOne').checked;
                if (voice) {
                    window.location.href = './voice_request.html';
                } else {
                    window.location.href = './request.html';
                }
            } else {
                const alertBtn = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Please Enter phone number
                    <button type="button" class="border-0 btn m-0 p-1 close" data-dismiss="alert" aria-label="Close">
                        <i aria-hidden="true">&times;</i>
                    </button>
                </div>`;
                alertContainer.innerHTML = alertBtn;
                alertContainerOne.innerHTML = alertBtn;
            }
        });
    });

    // Audio recording functionality
    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;

    const startRecordingBtn = document.getElementById('startRecordingBtn');
    const stopRecordingBtn = document.getElementById('stopRecordingBtn');
    const submitReq = document.getElementById('submitReq');

    if (startRecordingBtn) {
        startRecordingBtn.addEventListener('click', async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.start();
                toggleRecordingUI(true);

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
            } catch (error) {
                console.error('Error accessing audio stream:', error);
            }
        });
    }

    if (stopRecordingBtn) {
        stopRecordingBtn.addEventListener('click', () => {
            if (mediaRecorder) {
                mediaRecorder.stop();
                toggleRecordingUI(false);
            }
        });
    }

    // Form submission handling for requestForm
    if (document.getElementById('requestForm')) {
        document.getElementById('requestForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);
            const userPhoneNumber = localStorage.getItem('userPhoneNumber');

            if (audioBlob) {
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = function() {
                    const audioBase64 = reader.result.split(',')[1];
                    sendFormData('/.netlify/functions/send-email', { userPhoneNumber, audioBase64 });
                };
            } else {
                sendFormData('/.netlify/functions/send-email', { userPhoneNumber, audioBase64: '' });
            }
        });
    }

    // Form submission handling for requestFormType
    if (document.getElementById('requestFormType')) {
        document.getElementById('requestFormType').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);
            const items = formData.getAll('items[]');
            const quantities = formData.getAll('quantities[]');
            const addInfo = formData.get('add_info');
            const userPhoneNumber = localStorage.getItem('userPhoneNumber');
            
            sendFormData('/.netlify/functions/send-email', { items, quantities, addInfo, userPhoneNumber });
        });
    }

    async function sendFormData(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            displayAlert(response.ok ? 'success' : 'danger', result.message);
        } catch (error) {
            console.error('Error:', error);
            displayAlert('danger', 'Failed to send request. Please try again later.');
        }
    }

    function toggleRecordingUI(isRecording) {
        if (startRecordingBtn && stopRecordingBtn && submitReq) {
            if (isRecording) {
                startRecordingBtn.style.display = 'none';
                stopRecordingBtn.style.display = 'block';
                stopRecordingBtn.classList.add('recording-animation');
            } else {
                stopRecordingBtn.style.display = 'none';
                startRecordingBtn.style.display = 'block';
                submitReq.style.display = 'block';
                stopRecordingBtn.classList.remove('recording-animation');
            }

            startRecordingBtn.disabled = isRecording;
            stopRecordingBtn.disabled = !isRecording;
        }
    }

    function displayAlert(type, message) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="border-0 btn m-0 p-1 close" data-dismiss="alert" aria-label="Close">
                    <i aria-hidden="true">&times;</i>
                </button>
            </div>
        `;
        document.getElementById('alertContainer').innerHTML = alertHtml;
    }
});
