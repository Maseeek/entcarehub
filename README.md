# 🏥 ENT Care Hub

> **A modern, data-driven platform for connecting patients with ENT (Ear, Nose, and Throat) specialists**

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 📋 Table of Contents

- [About](#-about)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Development](#-development)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

**ENT Care Hub** is a comprehensive healthcare platform designed to streamline the process of finding and booking appointments with ENT specialists. The application provides a user-friendly interface for patients to search for consultants based on various criteria including specialization, location, availability, and ratings.

### The Problem We Solve

Finding the right medical specialist can be challenging and time-consuming. ENT Care Hub addresses this by:
- Centralizing consultant information in one accessible platform
- Providing transparent ratings and reviews from real patients
- Enabling advanced search with multiple filters
- Displaying real-time availability
- Showcasing top-performing consultants through data-driven leaderboards

### Mission Statement

*"Driven by data. Powered by people."*

We believe in making healthcare more accessible and transparent through technology, helping patients make informed decisions about their care.

---

## ✨ Key Features

### 🔍 Advanced Search Functionality
- **Multi-criteria filtering**: Search by speciality, clinic location, and availability date
- **Smart sorting**: Sort results by rating, total recommendations, or distance
- **Real-time availability**: Check consultant schedules and booking status
- **Intelligent matching**: Find the best consultant based on your specific needs

### 📊 Data-Driven Insights
- **Leaderboard system**: View top-rated consultants and most recommended specialists
- **Comprehensive ratings**: See average scores based on patient reviews
- **Recommendation tracking**: Total recommendations displayed for each consultant
- **Performance metrics**: Transparent data to help patients choose the right care

### 👤 Consultant Profiles
- **Detailed information**: View consultant specializations and affiliated clinics
- **Location data**: Access clinic addresses with geographic coordinates
- **Consultation fees**: Transparent pricing information
- **Patient reviews**: Read authentic feedback from previous patients

### 🎨 Modern User Interface
- **Responsive design**: Works seamlessly on desktop and mobile devices
- **React-powered components**: Fast, interactive user experience
- **Clean aesthetics**: Professional, medical-grade interface design
- **Intuitive navigation**: Easy-to-use menu system with quick access to all features

### 🌐 Additional Features
- **Review carousel**: Browse patient testimonials on the homepage
- **Video background**: Engaging landing page experience
- **Profile dropdown menu**: Quick access to search, statistics, and settings
- **Dynamic content loading**: Smooth, AJAX-based data retrieval

---

## 🛠️ Technology Stack

### Frontend
- **React 18**: Component-based UI with hooks (useState, useEffect, useRef)
- **Babel Standalone**: JSX transformation for in-browser React
- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling with modern layout techniques
- **JavaScript (ES6+)**: Client-side logic and API interactions

### Backend
- **PHP**: Server-side processing and business logic
- **MySQL**: Relational database management
- **REST API**: JSON-based data exchange

### Architecture
- **Client-Server Model**: Separation of concerns with dedicated client and server directories
- **AJAX Communication**: Asynchronous data fetching without page reloads
- **Component-Based Design**: Reusable UI components (Navbar, ReviewCarousel, etc.)

### Development Tools & Libraries
- **React CDN**: Quick prototyping without build setup
- **SVG Icons**: Scalable vector graphics for UI elements
- **Web Video API**: Background video integration

---

## 📁 Project Structure

```
entcarehub/
├── src/
│   ├── client/                    # Frontend application
│   │   ├── assets/               # Static assets (images, videos)
│   │   │   ├── background.png
│   │   │   ├── enthublogo.png
│   │   │   └── broll.webm
│   │   ├── components/           # Reusable React components
│   │   │   └── Navbar.php
│   │   ├── css/                  # Stylesheets
│   │   │   ├── Home.css
│   │   │   ├── Main.css
│   │   │   ├── Navbar.css
│   │   │   ├── Search.css
│   │   │   └── Statistics.css
│   │   ├── js/                   # JavaScript modules
│   │   │   ├── leaderboard.js
│   │   │   └── main.js
│   │   └── pages/                # Application pages
│   │       ├── home.php          # Landing page
│   │       ├── search.php        # Consultant search
│   │       └── statistics.php    # Leaderboard
│   └── server/                    # Backend application
│       ├── db-config.php                    # Database configuration
│       ├── get-consultant-profile.php       # Consultant details API
│       ├── get-reviews.php                  # Reviews API
│       ├── process-consultant-request.php   # Search & filter API
│       ├── process-leaderboard-request.php  # Leaderboard data API
│       └── process-leaderboard1-request.php # Alternative leaderboard API
└── README.md                      # Project documentation
```

### Directory Breakdown

- **`src/client/`**: Contains all frontend code including UI components, styles, and assets
- **`src/server/`**: Houses backend PHP scripts that handle database operations and API responses
- **`assets/`**: Stores images, logos, and multimedia files
- **`components/`**: Reusable UI components (e.g., navigation bar)
- **`pages/`**: Main application pages accessible to users
- **`css/`**: Modular stylesheets for different sections of the application
- **`js/`**: JavaScript files for client-side functionality

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **PHP**: Version 7.4 or higher
- **MySQL**: Version 5.7 or higher (or MariaDB 10.3+)
- **Browser**: Modern browser with JavaScript enabled (Chrome, Firefox, Safari, Edge)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Maseeek/entcarehub.git
cd entcarehub
```

### Step 2: Configure the Web Server

Point your web server's document root to the project directory:

**For Apache:**
```apache
<VirtualHost *:80>
    DocumentRoot "/path/to/entcarehub/src/client"
    ServerName entcarehub.local
    <Directory "/path/to/entcarehub/src/client">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

**For Nginx:**
```nginx
server {
    listen 80;
    server_name entcarehub.local;
    root /path/to/entcarehub/src/client;
    
    index home.php index.php index.html;
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

### Step 3: Database Setup

1. **Create the database:**
```sql
CREATE DATABASE coa123edb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Import the schema** (create tables for consultants, specialities, clinics, reviews, bookings, consultant_schedule)

Example schema structure:
```sql
-- Consultants table
CREATE TABLE consultants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    speciality_id INT,
    clinic_id INT,
    consultation_fee DECIMAL(10,2),
    FOREIGN KEY (speciality_id) REFERENCES specialities(id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(id)
);

-- Specialities table
CREATE TABLE specialities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    speciality VARCHAR(255) NOT NULL
);

-- Clinics table
CREATE TABLE clinics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8)
);

-- Reviews table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consultant_id INT,
    score INT,
    recommend BOOLEAN,
    comment TEXT,
    FOREIGN KEY (consultant_id) REFERENCES consultants(id)
);

-- Consultant schedule table
CREATE TABLE consultant_schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consultant_id INT,
    weekday INT,
    FOREIGN KEY (consultant_id) REFERENCES consultants(id)
);

-- Bookings table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consultant_id INT,
    booking_date DATE,
    FOREIGN KEY (consultant_id) REFERENCES consultants(id)
);
```

3. **Configure database credentials:**

Edit `src/server/db-config.php`:
```php
<?php
$servername = "localhost";  // Your MySQL server
$username = "your_username"; // Your MySQL username
$password = "your_password"; // Your MySQL password
$dbname = "coa123edb";      // Database name
?>
```

### Step 4: Set Permissions

```bash
chmod 644 src/server/db-config.php
chmod 755 src/client/pages/*.php
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://entcarehub.local/pages/home.php
```
or
```
http://localhost/pages/home.php
```

---

## 💻 Usage

### For Patients

1. **Browse the Homepage**
   - View the welcome message and mission statement
   - Read patient reviews in the carousel
   - Click "Find a consultant" to start searching

2. **Search for Consultants**
   - Select a speciality from the dropdown
   - Choose a clinic location
   - Pick an available date
   - Sort results by rating, recommendations, or distance

3. **View Consultant Details**
   - Click on a consultant card to see their profile
   - Review their ratings and patient feedback
   - Check consultation fees and clinic information

4. **Explore the Leaderboard**
   - Access via the statistics page
   - See top-rated consultants
   - View most recommended specialists
   - Compare performance metrics

### For Developers

**Running Locally:**
```bash
# Start PHP development server
cd src/client
php -S localhost:8000

# Access the application
open http://localhost:8000/pages/home.php
```

**Making API Requests:**
```javascript
// Search for consultants
fetch('../server/process-consultant-request.php?speciality=ENT&clinic=General Hospital&sort=Rating')
  .then(response => response.json())
  .then(data => console.log(data));

// Get consultant profile
fetch('../server/get-consultant-profile.php?id=1')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 🗄️ Database Schema

### Core Tables

#### `consultants`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Unique consultant identifier |
| name | VARCHAR(255) | Consultant's full name |
| speciality_id | INT (FK) | Reference to specialities table |
| clinic_id | INT (FK) | Reference to clinics table |
| consultation_fee | DECIMAL(10,2) | Fee charged for consultation |

#### `specialities`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Unique speciality identifier |
| speciality | VARCHAR(255) | Speciality name (e.g., "ENT") |

#### `clinics`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Unique clinic identifier |
| name | VARCHAR(255) | Clinic name |
| latitude | DECIMAL(10,8) | Geographic latitude |
| longitude | DECIMAL(11,8) | Geographic longitude |

#### `reviews`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Unique review identifier |
| consultant_id | INT (FK) | Reference to consultant |
| score | INT | Rating score |
| recommend | BOOLEAN | Recommendation status |
| comment | TEXT | Review text |

#### `consultant_schedule`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Unique schedule identifier |
| consultant_id | INT (FK) | Reference to consultant |
| weekday | INT | Day of week (0-6) |

#### `bookings`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Unique booking identifier |
| consultant_id | INT (FK) | Reference to consultant |
| booking_date | DATE | Date of booking |

### Entity Relationships

```
consultants ─┬─→ specialities (many-to-one)
             ├─→ clinics (many-to-one)
             ├─← reviews (one-to-many)
             ├─← consultant_schedule (one-to-many)
             └─← bookings (one-to-many)
```

---

## 🔌 API Endpoints

### 1. Search Consultants
**Endpoint:** `GET /server/process-consultant-request.php`

**Parameters:**
- `speciality` (string, optional): Filter by speciality
- `clinic` (string, optional): Filter by clinic name
- `date` (string, optional): Filter by availability (YYYY-MM-DD)
- `sort` (string, optional): Sort by "Rating", "Total Recommendations", or "Distance"

**Response:**
```json
[
  {
    "id": "1",
    "name": "Dr. John Smith",
    "speciality": "ENT",
    "clinic_name": "General Hospital",
    "latitude": "51.5074",
    "longitude": "-0.1278",
    "average_score": "4.5",
    "total_recommendations": "25"
  }
]
```

### 2. Get Consultant Profile
**Endpoint:** `GET /server/get-consultant-profile.php`

**Parameters:**
- `id` (integer, required): Consultant ID

**Response:**
```json
[
  {
    "id": "1",
    "name": "Dr. John Smith",
    "consultation_fee": "150.00",
    "clinic_name": "General Hospital",
    "latitude": "51.5074",
    "longitude": "-0.1278"
  }
]
```

### 3. Get Reviews
**Endpoint:** `GET /server/get-reviews.php`

**Response:**
```json
[
  {
    "id": "1",
    "consultant_id": "1",
    "score": "5",
    "recommend": true,
    "comment": "Excellent service and care!"
  }
]
```

### 4. Get Leaderboard Data
**Endpoint:** `GET /server/process-leaderboard-request.php`

**Response:**
```json
[
  {
    "rank": "1",
    "name": "Dr. John Smith",
    "total_recommendations": "50",
    "average_score": "4.8"
  }
]
```

---

## 🔧 Development

### Code Style Guidelines

**PHP:**
- Follow PSR-12 coding standards
- Use meaningful variable names
- Sanitize all user inputs
- Use prepared statements for database queries (future enhancement)

**JavaScript:**
- Use ES6+ features (const, let, arrow functions)
- Follow React hooks best practices
- Use meaningful component and function names
- Comment complex logic

**CSS:**
- Use BEM naming convention where applicable
- Keep selectors specific but not overly nested
- Group related styles together
- Use CSS custom properties for theming

### Adding New Features

1. **Create a new page:**
   - Add PHP file to `src/client/pages/`
   - Include the Navbar component
   - Create corresponding CSS file in `src/client/css/`

2. **Add new API endpoint:**
   - Create PHP file in `src/server/`
   - Include `db-config.php`
   - Return JSON response
   - Handle errors appropriately

3. **Create new React component:**
   - Define component using functional syntax
   - Use React hooks for state management
   - Render using `ReactDOM.createRoot()`

### Testing

**Manual Testing Checklist:**
- [ ] Test search functionality with various filters
- [ ] Verify consultant profiles load correctly
- [ ] Check leaderboard rankings are accurate
- [ ] Test responsive design on mobile devices
- [ ] Validate all API endpoints return expected data
- [ ] Check error handling for invalid inputs
- [ ] Test navigation between pages

### Performance Optimization

- Implement database indexing on frequently queried columns
- Add caching for static assets
- Optimize images and videos
- Minimize and bundle CSS/JS files
- Use CDN for React libraries (already implemented)

---

## 🎯 Future Enhancements

### Short-term Goals
- [ ] **Implement booking system**: Allow patients to book appointments directly
- [ ] **User authentication**: Add login/registration for patients and consultants
- [ ] **Enhanced security**: Migrate to prepared statements to prevent SQL injection
- [ ] **Email notifications**: Send confirmation emails for bookings
- [ ] **Dark mode**: Complete dark mode implementation
- [ ] **Mobile app**: Develop native iOS and Android applications

### Medium-term Goals
- [ ] **Advanced filtering**: Add more search criteria (language, gender, years of experience)
- [ ] **Real-time chat**: Enable messaging between patients and consultants
- [ ] **Calendar integration**: Sync appointments with Google/Outlook calendars
- [ ] **Payment processing**: Integrate online payment for consultation fees
- [ ] **Multi-language support**: Add internationalization
- [ ] **Accessibility improvements**: Ensure WCAG 2.1 AA compliance

### Long-term Vision
- [ ] **AI-powered recommendations**: Machine learning for consultant matching
- [ ] **Telemedicine integration**: Video consultation capabilities
- [ ] **Analytics dashboard**: Comprehensive insights for consultants
- [ ] **Insurance integration**: Verify coverage and process claims
- [ ] **Blockchain records**: Secure, decentralized medical records
- [ ] **API for third-party integration**: Allow other healthcare platforms to integrate

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear, concise commit messages
- Add comments to complex code sections
- Update documentation for new features
- Test your changes thoroughly
- Follow the existing code style
- One feature per pull request

### Areas Where We Need Help

- 🔒 Security auditing and improvements
- 🎨 UI/UX design enhancements
- 📱 Mobile responsiveness optimization
- 🧪 Automated testing implementation
- 📚 Documentation improvements
- 🌐 Internationalization support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

---

## 👥 Contact

**Project Maintainer:** Maseeek

- GitHub: [@Maseeek](https://github.com/Maseeek)
- Project Link: [https://github.com/Maseeek/entcarehub](https://github.com/Maseeek/entcarehub)

### Get in Touch

- 💬 **Questions?** Open an issue on GitHub
- 🐛 **Found a bug?** Report it in the Issues section
- 💡 **Have an idea?** We'd love to hear your suggestions!
- 🤝 **Want to collaborate?** Reach out via GitHub

---

## 🙏 Acknowledgments

- **React Team**: For the amazing React library
- **PHP Community**: For comprehensive documentation and support
- **Contributors**: Everyone who has contributed to making this project better
- **Users**: Thank you for using ENT Care Hub and providing valuable feedback

---

## 🌟 Star This Repository

If you find this project useful, please consider giving it a star ⭐ on GitHub. It helps others discover the project and motivates us to keep improving!

---

<div align="center">

**Made with ❤️ for better healthcare accessibility**

*Driven by data. Powered by people.*

[⬆ Back to Top](#-ent-care-hub)

</div>
