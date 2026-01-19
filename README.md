<p align="center">
  <img src="./logo.jpeg" alt="Mysuru Sampada Logo" width="220"/>
</p>

# Mysuru Sampada – Multi-Language Tourism Platform

<p align="center">
  🌐 <a href="https://mysurusampada.vercel.app" target="_blank"><b>Live Demo</b></a>
</p>


Mysuru Sampada is a modern, multi-language tourism web application designed to showcase Mysuru’s cultural heritage, attractions, and travel experiences through an interactive and visually rich interface.

The project is built with a **full-stack vision**, where the frontend is fully implemented and backend services have been developed locally and are ready for integration.

---

## 🌟 Project Highlights
- Multi-language support (English, Hindi, Kannada)
- Clean and premium UI inspired by Mysuru’s cultural heritage
- Dark / Light theme support
- User, Partner, and Admin dashboard structure
- Designed with scalability and backend integration in mind

---

## 🌐 Multi-Language Support (i18n)
- **3 Languages**: English, Hindi (हिंदी), Kannada (ಕನ್ನಡ)
- **160+ Translation Keys** across the application
- **Instant language switching** with persistence using `localStorage`
- Complete coverage of all user-facing text

---

## 📄 Pages & Functionality

### Core Pages
- **Home** – Platform introduction and featured sections  
- **Authentication** – Login, Signup, Forgot Password (UI + flow)  
- **Explore** – Famous Places, Hidden Gems, Hotels, Food, Culture, Artists  
- **Trip Planning** – Interactive itinerary planning interface  
- **Settings** – Language selection, profile settings, theme toggle  

### Dashboards
- **User Dashboard** – Exploration shortcuts, saved items, quick actions  
- **Admin Dashboard** – User and partner management layouts with statistics  
- **Partner Dashboard** – Partner-focused management interface  

> Note: The current repository version demonstrates frontend structure and flows. These are designed to connect seamlessly with backend APIs.

---

## 🎨 Design & UI Features
- Dark / Light theme with smooth transitions  
- Glass-morphism inspired UI components  
- Particle background with mouse interaction  
- Custom glowing cursor effect  
- Fully responsive design for all screen sizes  

---

## 📁 Project Structure
```
Mysuru Sampada/
├── src/
│ ├── components/
│ │ ├── Layout.jsx
│ │ ├── ParticleBackground.jsx
│ │ └── GlowingCursor.jsx
│ ├── context/
│ │ └── LanguageContext.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── ForgotPassword.jsx
│ │ ├── Settings.jsx
│ │ ├── Explore.jsx
│ │ ├── TripPlanning.jsx
│ │ └── dashboards/
│ │ ├── UserDashboard.jsx
│ │ ├── AdminDashboard.jsx
│ │ └── PartnerDashboard.jsx
│ ├── data/
│ │ └── placesData.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── logo.jpeg
└── README.md
```

---

## 🔧 Technologies Used

### Frontend
- React (Hooks)
- React Router
- Vite
- Lucide React
- CSS Variables
- Canvas API

### Backend (Implemented Locally)
- Node.js
- REST API architecture
- PostgreSQL / Supabase
- Authentication and authorization logic

---

## 🧪 Data & Current Setup
The current repository uses mock data to demonstrate application flows, dashboards, and UI behavior.

This setup will be replaced with live backend APIs once the backend code is integrated into the repository.

---

## 🛠 Backend Implementation
The backend for Mysuru Sampada has been designed and implemented locally as part of the full-stack development process.

Backend responsibilities include:
- REST API development using Node.js  
- Database design and integration  
- Authentication and authorization  
- Dynamic data handling for places, trips, and users  
- Admin and partner management APIs  

The backend will be pushed and integrated into this repository as part of a future update.

---

## 📌 Project Status
🟢 **Completed (v1)**  

The core application features, UI, and system architecture are fully implemented.  
Backend services are implemented locally and ready for repository integration.

---

## 🎯 Future Enhancements
- Full backend integration with live APIs  
- AI-assisted trip planning logic  
- Real-time booking system  
- Payment gateway integration  
- Mobile application (React Native)  
- Support for additional regional languages  

---

## 📄 License
This project is built for educational and demonstration purposes.

---

**Built with ❤️ for Mysuru Tourism**
