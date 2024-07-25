# FinSpare Spare Parts Request System

This project is a web application designed to facilitate the process of requesting spare parts from your nearest shop. The application allows users to submit requests either by filling out a form with item details or by recording an audio message. The request will be sent through an email,  then the company will respond to their email. The folllowing is the example of of the system: https://finspare.netlify.app/

## Features

- **Item Request Form**: Users can fill out a form with the item name, quantity, and additional information.
- **Audio Request**: Users can record an audio message and submit it as a request.
- **Phone Number Storage**: Users' phone numbers are stored locally for convenience.
- **Dynamic Form Fields**: Users can add or remove item fields as needed.
- **Email Notifications**: Requests are sent via email to the shop.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, jQuery
- **Backend**: Node.js, Express.js, Nodemailer
- **Storage**: Local Storage
- **Deployment**: Netlify Functions

## Pictorials:

- **Voice request**
![image](https://github.com/user-attachments/assets/bc09e8ba-90e3-4838-902e-7e1f3c1b4680)
![image](https://github.com/user-attachments/assets/5085ca84-ce72-4fc6-aad7-6576c985ef94)
![image](https://github.com/user-attachments/assets/c720f0f4-a34d-44dd-a393-3d725f093b71)

- **Type request**
![image](https://github.com/user-attachments/assets/2f48cef3-da28-40c3-8cc3-606bc26cf318)
![image](https://github.com/user-attachments/assets/5093554c-fb91-4dfb-8f31-7b7f5157dcff)
![image](https://github.com/user-attachments/assets/2b503d7b-3851-4294-8fab-8c0f0af62e2b)



## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- A Gmail account for sending emails

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/odiedo/finspare.git
    cd finspare
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Setup environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ```

4. **Run the server:**
    ```bash
    npm start
    ```

### Deployment

1. **Deploy to Netlify:**
    - Connect your GitHub repository to Netlify.
    - Configure Netlify Functions to handle serverless email sending.

## Usage

### Requesting Spare Parts

1. **Form Submission:**
    - Navigate to the request form page.
    - Enter the item details, quantity, and any additional information.
    - Submit the form.

2. **Audio Request:**
    - Navigate to the audio request page.
    - Record your message using the provided controls.
    - Submit the audio request.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**
    ```bash
    git checkout -b feature-name
    ```
3. **Make your changes and commit them:**
    ```bash
    git commit -m 'Add new feature'
    ```
4. **Push to the branch:**
    ```bash
    git push origin feature-name
    ```
5. **Submit a pull request.**


## Contact

If you have any questions or need further assistance, feel free to contact me at `odiedopaul@gmail.com`.
