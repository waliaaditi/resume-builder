# Resume Builder
Resume Builder is a web application that allows users to create professional resumes using various templates. Users can customize their resumes, change font styles and colors, save them, and download them as PDFs. The application uses Firebase for authentication and supports functionalities like password reset and user profile updates.

## Features

- Multiple resume templates
- Customize font styles and colors
- Save and download resumes as PDF
- Editor to write the resume content
- Contact Us section for asking queries and give feedback.
- User authentication with Firebase
  - Sign up and login
  - Forget password functionality
  - User profile update
## Technologies Used
### Frontend

- React
- Firebase Authentication
- Chakra UI
- React Router
- Html2pdf (for PDF generation)
- Recoil (for global state management)
- EmailJS (for sending emails)

### Backend

- Node.js
- Express
- MongoDB
# setup an env file for backend
    PORT=
    MONGO_URL=
 after setting up the env
       1. cd/backend
       2. npm start

# setup an env file for frontend
    REACT_APP_API_KEY=
    REACT_APP_AUTH_DOMAIN=
    REACT_APP_PROJECT_ID=
    REACT_APP_STORAGE_BUCKET=
    REACT_APP_MESSAGING_SENDER_ID=
    REACT_APP_APP_ID=
    REACT_APP_MEASUREMENT_ID=
# For Frontend
     1. cd/frontend
     2. npm run dev  
These all things are required for firebase authentication 

