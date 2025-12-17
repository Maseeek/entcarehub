# ENT Care Hub 🏥

<div align="center">

![ENT Care Hub Logo](src/client/assets/enthublogo.png)

**A comprehensive web platform for connecting patients with ENT (Ear, Nose, and Throat) consultants**

[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Database Design](#database-design)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Features in Detail](#features-in-detail)
- [Skills Demonstrated](#skills-demonstrated)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

---

## 🎯 Overview

ENT Care Hub is a full-stack web application designed to streamline the process of finding and booking appointments with ENT specialists. The platform provides patients with an intuitive interface to search for consultants based on specialty, location, availability, and ratings, while showcasing consultant profiles through a comprehensive review system and leaderboard.

This project demonstrates proficiency in both frontend and backend development, database design, and modern web development practices suitable for a production environment.

### 🎓 Academic Context

This project was developed as part of my academic coursework, showcasing practical application of:
- Full-stack web development principles
- Database design and optimization
- RESTful API development
- Responsive UI/UX design
- Client-server architecture

---

## ✨ Key Features

### For Patients
- 🔍 **Advanced Search System**: Filter consultants by specialty, location, availability, and sort by ratings or distance
- ⭐ **Review System**: Access authentic patient reviews and ratings for informed decision-making
- 📊 **Leaderboard**: View top-rated consultants and most recommended specialists
- 📍 **Location-Based Search**: Find consultants near you with distance calculations
- 📅 **Availability Checking**: Real-time availability based on consultant schedules and existing bookings
- 💰 **Transparent Pricing**: View consultation fees upfront

### System Features
- 🎨 **Modern UI/UX**: Clean, responsive design with React components
- 🔄 **Dynamic Content**: Real-time data fetching and updates
- 📱 **Responsive Design**: Works seamlessly across desktop and mobile devices
- 🎬 **Interactive Elements**: Auto-scrolling carousels, hover effects, and smooth transitions
- 🌐 **RESTful API**: Well-structured backend endpoints for data operations

---

## 🛠️ Technology Stack

### Frontend
- **React 18**: Component-based UI development with hooks
- **Babel Standalone**: For JSX transformation in the browser
- **HTML5/CSS3**: Semantic markup and modern styling
- **JavaScript (ES6+)**: Modern JavaScript features and async/await patterns
- **jQuery**: DOM manipulation and AJAX requests

### Backend
- **PHP 7+**: Server-side logic and API endpoints
- **MySQL**: Relational database for data persistence
- **JSON**: Data interchange format for API responses

### Architecture Patterns
- **Client-Server Architecture**: Clear separation of concerns
- **RESTful API Design**: Stateless, resource-based endpoints
- **Component-Based UI**: Reusable React components
- **MVC Pattern**: Separation of data, presentation, and logic

---

## 🏗️ Project Architecture

```
entcarehub/
├── src/
│   ├── client/                    # Frontend application
│   │   ├── pages/                 # PHP pages with embedded React
│   │   │   ├── home.php          # Landing page with video background
│   │   │   ├── search.php        # Consultant search interface
│   │   │   └── statistics.php    # Leaderboard page
│   │   ├── components/           # Reusable components
│   │   │   └── Navbar.php        # Navigation component
│   │   ├── js/                   # JavaScript files
│   │   │   ├── leaderboard.js    # Leaderboard logic
│   │   │   └── main.js           # Common utilities
│   │   ├── css/                  # Stylesheets
│   │   │   ├── Main.css          # Global styles
│   │   │   ├── Navbar.css        # Navigation styles
│   │   │   ├── Home.css          # Home page styles
│   │   │   ├── Search.css        # Search page styles
│   │   │   └── Statistics.css    # Leaderboard styles
│   │   └── assets/               # Images and media
│   │       ├── enthublogo.png    # Application logo
│   │       └── background.png    # Background assets
│   └── server/                   # Backend API
│       ├── db-config.php         # Database configuration
│       ├── process-consultant-request.php        # Consultant search API
│       ├── get-reviews.php                       # Reviews API
│       ├── get-consultant-profile.php            # Profile details API
│       ├── process-leaderboard-request.php       # Rating leaderboard API
│       └── process-leaderboard1-request.php      # Recommendation leaderboard API
└── README.md
```

### Design Decisions

1. **React with Babel Standalone**: Allows for component-based development without a build process, making the project easier to deploy and maintain in an academic environment.

2. **PHP Backend**: Chosen for its simplicity, wide hosting support, and direct MySQL integration, making it ideal for a student project with limited resources.

3. **Separation of Concerns**: Clear division between client and server code facilitates maintenance and scalability.

---

## 💾 Database Design

The application uses a relational MySQL database with the following key entities:

### Core Tables

#### `consultants`
- Primary entity storing consultant information
- Fields: `id`, `name`, `speciality_id`, `clinic_id`, `consultation_fee`
- Foreign keys to `specialities` and `clinics` tables

#### `specialities`
- ENT specializations (Otology, Rhinology, Laryngology, etc.)
- Fields: `id`, `speciality`

#### `clinics`
- Clinic locations with geographical data
- Fields: `id`, `name`, `latitude`, `longitude`
- Enables distance-based searching

#### `reviews`
- Patient feedback and ratings
- Fields: `id`, `consultant_id`, `score`, `feedback`, `recommend`
- Links to `consultants` for aggregated ratings

#### `consultant_schedule`
- Weekly availability patterns
- Fields: `consultant_id`, `weekday`
- Used for availability filtering

#### `bookings`
- Existing appointments
- Fields: `id`, `consultant_id`, `booking_date`
- Prevents double-booking

### Database Relationships

```
consultants (1) ──→ (N) reviews
consultants (N) ──→ (1) specialities
consultants (N) ──→ (1) clinics
consultants (1) ──→ (N) consultant_schedule
consultants (1) ──→ (N) bookings
```

### Key SQL Queries

The application demonstrates advanced SQL techniques:
- **Aggregate Functions**: `AVG()`, `COUNT()` for ratings and recommendations
- **Joins**: Multiple JOIN operations across related tables
- **Grouping**: `GROUP BY` for consultant-level aggregations
- **Conditional Logic**: Dynamic WHERE clauses based on filter parameters
- **Subqueries**: `NOT EXISTS` for availability checking
- **Sorting**: Dynamic `ORDER BY` based on user selection

---

## 🚀 Getting Started

### Prerequisites

- **Web Server**: Apache/Nginx with PHP 7.4+ support
- **Database**: MySQL 5.7+ or MariaDB 10.2+
- **Browser**: Modern browser with JavaScript enabled

### Installation Steps

1. **Clone the repository**
   ```bash
   # Replace with your actual repository URL
   git clone https://github.com/Maseeek/entcarehub.git
   cd entcarehub
   ```

2. **Database Setup**
   ```bash
   # Create a MySQL database
   mysql -u root -p
   CREATE DATABASE coa123edb;
   ```
   
   ```sql
   -- Import your database schema (create tables for consultants, specialities, clinics, reviews, etc.)
   -- Sample table structures are implied from the PHP code
   ```

3. **Configure Database Connection**
   
   Edit `src/server/db-config.php` with your database credentials:
   ```php
   <?php
   $servername = "localhost";  // Your MySQL server
   $username = "your_username";
   $password = "your_password";
   $dbname = "coa123edb";
   ?>
   ```

4. **Deploy to Web Server**
   
   Copy the project to your web server's document root:
   ```bash
   # For Apache (XAMPP/WAMP/LAMP)
   cp -r entcarehub /path/to/htdocs/
   
   # Or for production
   cp -r entcarehub /var/www/html/
   ```

5. **Access the Application**
   
   Open your browser and navigate to:
   ```
   http://localhost/entcarehub/src/client/pages/home.php
   ```

### Environment Setup Notes

- Ensure PHP MySQLi extension is enabled
- Configure your web server to allow PHP execution
- Set appropriate file permissions for the web server user
- For development, XAMPP or WAMP provides an easy setup

---

## 🔌 API Endpoints

All endpoints return JSON responses and follow RESTful principles.

### Consultant Search
```
GET /server/process-consultant-request.php
```

**Query Parameters:**
- `speciality` (string): Filter by ENT specialty
- `clinic` (string): Filter by clinic name
- `date` (string): Filter by availability date (YYYY-MM-DD)
- `sort` (string): Sort results ("Rating", "Total Recommendations", "Distance")

**Response:**
```json
[
  {
    "id": "1",
    "name": "Dr. John Smith",
    "speciality": "Otology",
    "clinic_name": "Riverside ENT Clinic",
    "latitude": "40.7128",
    "longitude": "-74.0060",
    "average_score": "4.75",
    "total_recommendations": "42"
  }
]
```

### Reviews
```
GET /server/get-reviews.php
```

**Response:**
```json
[
  {
    "feedback": "Excellent service and very professional",
    "recommend": true,
    "score": 5,
    "consultant_name": "Dr. John Smith"
  }
]
```

### Consultant Profile
```
GET /server/get-consultant-profile.php?id={consultant_id}
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Dr. John Smith",
    "clinic_name": "Riverside ENT Clinic",
    "latitude": "40.7128",
    "longitude": "-74.0060",
    "consultation_fee": "150"
  }
]
```

### Leaderboard - By Rating
```
GET /server/process-leaderboard-request.php
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Dr. John Smith",
    "average_score": "4.85"
  }
]
```

### Leaderboard - By Recommendations
```
GET /server/process-leaderboard1-request.php
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Dr. John Smith",
    "total_recommendations": "98",
    "recommendation_percentage": "87.50"
  }
]
```

---

## 🎨 Features in Detail

### 1. Landing Page (home.php)

The home page creates an engaging first impression with:
- **Video Background**: Eye-catching fullscreen video on landing
- **Auto-scrolling Review Carousel**: Showcases real patient testimonials
- **Interactive Navigation**: React-based navbar with smooth dropdown menus
- **Call-to-Action**: Prominent "Find a consultant" button

**Technical Highlights:**
- React hooks (`useState`, `useEffect`, `useRef`) for state management
- Automatic carousel with pause-on-hover functionality
- Async data fetching from reviews API
- Responsive video container with fallback support

### 2. Consultant Search (search.php)

Advanced filtering system allowing users to:
- Search by name with real-time filtering
- Filter by specialty (7 ENT specializations)
- Filter by clinic location (8 clinic options)
- Filter by date availability
- Sort results by rating, recommendations, or distance

**Technical Highlights:**
- React component with multiple state variables
- Dynamic URL parameter construction
- Debounced search for performance
- Conditional rendering based on filter results
- Distance calculation integration

### 3. Statistics & Leaderboard (statistics.php)

Dual leaderboard system displaying:
- **Most Recommended Consultants**: Based on total recommendations and percentage
- **Highest Rated Consultants**: Based on average review scores

**Technical Highlights:**
- Color-coded scores (green/orange/red) based on thresholds
- Interactive consultant profiles on click
- Modal popup for detailed information
- Real-time data fetching from two separate endpoints
- Dynamic DOM manipulation for leaderboard population

### 4. Review System

Comprehensive patient feedback mechanism:
- 5-star rating system
- Recommendation badges
- Detailed feedback text
- Consultant attribution

**Technical Highlights:**
- Star rendering based on numeric scores
- Conditional badge styling
- Randomized review display for variety
- Aggregated statistics displayed across the platform

---

## 💼 Skills Demonstrated

This project showcases a wide range of technical and professional skills valuable to employers:

### Technical Skills

#### Frontend Development
- ✅ React 18 with Hooks (useState, useEffect, useRef)
- ✅ Modern JavaScript (ES6+, async/await, fetch API)
- ✅ Responsive CSS design
- ✅ DOM manipulation and event handling
- ✅ Component-based architecture
- ✅ State management
- ✅ Asynchronous programming

#### Backend Development
- ✅ PHP server-side programming
- ✅ RESTful API design
- ✅ SQL query construction and optimization
- ✅ Database connection management
- ✅ JSON data serialization
- ✅ Query parameter handling
- ✅ Error handling and validation

#### Database Management
- ✅ Relational database design
- ✅ Complex SQL queries with multiple JOINs
- ✅ Aggregate functions and grouping
- ✅ Foreign key relationships
- ✅ Data normalization
- ✅ Query optimization techniques

#### Software Engineering Practices
- ✅ Separation of concerns (MVC pattern)
- ✅ Code organization and project structure
- ✅ API-first development approach
- ✅ Version control with Git
- ✅ Modular code design
- ✅ Documentation and commenting

### Problem-Solving Abilities

1. **Dynamic Filtering**: Implemented flexible search with multiple optional parameters
2. **Availability Logic**: Complex date-based availability checking with schedule and booking constraints
3. **Performance Optimization**: Efficient database queries with proper indexing considerations
4. **User Experience**: Intuitive interface with helpful visual feedback
5. **Data Aggregation**: Calculated metrics like average ratings and recommendation percentages

### Professional Skills

- 📝 **Clear Documentation**: Comprehensive README and inline code comments
- 🎨 **UI/UX Design**: User-friendly interface with modern design principles
- 🔄 **Iterative Development**: Evidence of feature additions and refinements
- 🧪 **Testing Mindset**: Consideration for edge cases and error handling
- 📊 **Data-Driven Decisions**: Use of analytics and statistics features

---

## 🔮 Future Enhancements

Potential improvements to expand the project's capabilities:

### Short-term Goals
- [ ] User authentication and authorization system
- [ ] Patient profiles with booking history
- [ ] Email notifications for appointments
- [ ] More detailed consultant profiles (education, experience, certifications)
- [ ] Advanced search filters (languages spoken, insurance accepted)
- [ ] Appointment booking functionality (currently just a button)

### Medium-term Goals
- [ ] Review moderation system
- [ ] Consultant dashboard for managing schedules
- [ ] Patient appointment management interface
- [ ] Real-time chat between patients and clinics
- [ ] Integration with payment gateways
- [ ] SMS notifications for appointment reminders

### Long-term Goals
- [ ] Mobile application (React Native)
- [ ] AI-powered consultant recommendations
- [ ] Telemedicine integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with electronic health records (EHR)
- [ ] Social features (patient community, Q&A forums)

### Technical Improvements
- [ ] Migration to a modern framework (Laravel, Next.js)
- [ ] Implementation of a proper build process
- [ ] Unit and integration testing
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] API rate limiting and authentication
- [ ] Caching layer for improved performance
- [ ] Database migration system

---

## 🤝 Contributing

While this is primarily an academic project, suggestions and feedback are welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📞 Contact & Links

**Developer**: Maseeek

**Project Repository**: [github.com/Maseeek/entcarehub](https://github.com/Maseeek/entcarehub)

**Project Status**: Active Development (Academic Project)

---

## 📄 License

This project is developed for academic purposes. Please contact the author for usage permissions.

---

## 🙏 Acknowledgments

- React team for the excellent documentation
- PHP and MySQL communities for robust tools
- Academic advisors and peers for feedback and support
- Open-source community for inspiration

---

<div align="center">

**Built with ❤️ for learning and demonstrating full-stack development skills**

⭐ Star this repository if you found it helpful!

</div>
