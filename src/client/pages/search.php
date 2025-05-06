<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Find your consultant</title>
    <link rel="stylesheet" href="../css/Search.css">
    <link rel="stylesheet" href="../css/Navbar.css">
    <link rel="stylesheet" href="../css/Main.css">
</head>
<body>
<div id="navbar-root"></div>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
    const { useState } = React;

    function HomeButton() {
        return (
            <a href="home.php">
                <button className="home-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </button>
            </a>
        );
    }

    function ProfileButton({ onClick }) {
        return (
            <button className="profile-btn" onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            </button>
        );
    }

    function DropdownMenu({ isVisible }) {
        return (
            <div className={`dropdown-menu ${isVisible ? 'visible' : ''}`}>
                <a href="search.php" className="dropdown-item">🔍 Search</a>
                <a href="statistics.php" className="dropdown-item">📊 Statistics</a>
                <a href="settings.php" className="dropdown-item">⚙️ Settings</a>
            </div>
        );
    }

    function Navbar() {
        const [isDropdownVisible, setDropdownVisible] = useState(false);
        const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

        return (
            <div className="nav-container">
                <div className="nav-title">
                    <img src="../assets/ennthublogo.png" alt="Logo" height="50" className="logo"/>
                    <h2 className="title">entcarehub</h2>
                </div>
                <div className="nav-options">
                    <HomeButton />
                    <ProfileButton onClick={toggleDropdown} />
                    <DropdownMenu isVisible={isDropdownVisible} />
                </div>
            </div>
        );
    }

    ReactDOM.createRoot(document.getElementById('navbar-root')).render(<Navbar />);
</script>



<div class="container" onload="getConsultants()">
    <div class="select-group">
        <div class="option-container">
            <select id="speciality" onchange="getConsultants()">
                <option value="">All Specialities</option>
                <option>Otology</option>
                <option>Rhinology</option>
                <option>Laryngology</option>
                <option>Paediatric ENT</option>
                <option>Allergy</option>
                <option>Head and Neck Surgery</option>
            </select>
        </div>
        <div class="option-container">
            <select id="location" onchange="getConsultants()">
                <option value="">All Locations</option>
                <option>Riverside ENT Clinic</option>
                <option>Oakwood ENT Centre</option>
                <option>Elmwood Medical Hub</option>
                <option>Haven ENT Clinic</option>
                <option>Meadowlands Health Point</option>
                <option>Hillside ENT Centre</option>
                <option>Valley View Clinic</option>
                <option>Lakeside ENT Clinic</option>
            </select>
        </div>
        <div class="option-container">
            <input type="date" id="date" onchange="getConsultants()">
            <select id="sort" onchange="getConsultants()">
                <option value="">Sort by</option>
                <option>Rating</option>
                <option>Total Recommendations</option>
                <option>Distance</option>
            </select>
        </div>
    </div>
    <div id="consultant-list"></div>
</div>



</body>

<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script src="../js/main.js"></script>
</html>



