# Instagram Clone

A web application clone of Instagram built using React, Firebase, and Tailwind CSS.
<br />

## Features

- **Authentication**: Users can sign up, log in, and log out securely using Firebase Authentication.
- **Create Posts**: Users can create new posts by uploading images along with captions.
- **Like and Comment**: Users can like posts and leave comments on them.
- **Real-time Updates**: Posts and their associated likes and comments are updated in real-time using Firebase Firestore.
- **Responsive Design**: The application is fully responsive, ensuring a seamless experience across devices.

## Demo

You can access the live demo of the project [here](https://instagram-clone-deep512.vercel.app/).

🚨 **Attention Visitors:** 🚨

Oh no! It seems like our website is so dangerously cool that even Chrome thinks it might be up to no good. But fear not, brave adventurer! We promise there are no dragons lurking here, just some awesome content waiting to be explored.

**Disclaimer:** Our website may trigger Chrome's "Dangerous site" warning, but rest assured, it's perfectly safe to explore. We won't ask for your password, phone number, or credit card details. Scout's honor!

So, grab your virtual sword and shield, and let's embark on this epic journey together!

Happy browsing! 🛡️🔮

## Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Deep512/instagram-clone.git
   ```
## Installation

To run this project locally, follow these steps:

1. **Navigate into the project directory:**

    ```bash
    cd Instagram-Clone
    ```

2. **Install the necessary dependencies using npm:**

    ```bash
    npm install
    ```

## Configuration

Before running the project, you need to set up Firebase Firestore and obtain the configuration keys. Follow these steps:

1. Create a Firebase project and set up Firestore.
2. Go to the project settings and find the configuration snippet for web apps.
3. Copy the configuration object.
4. Create a new file named `.env.local` in the root directory of the project.
5. Add the Firebase configuration to the `.env.local` file:

    ```
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```

## Running Locally

Once you have installed the dependencies and configured Firebase, you can run the project locally:

```bash
npm start
```

The application will start running at [http://localhost:3000](http://localhost:3000). Open this URL in your web browser to view the Instagram clone.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project was inspired by Instagram.
- Special thanks to Firebase for providing the Firestore service.
- Tailwind CSS was used for styling the application.
- React was used as the JavaScript library for building the user interface.

## To-do
- [ ] Add images from device and store them in AWS S3 (currently working)
- [ ] Modals for followers, following, photos
- [ ] Search bar
