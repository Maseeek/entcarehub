<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Find your consultant</title>
    <link rel="stylesheet" href="Search.css">
    <link rel="stylesheet" href="Navbar.css">
    <link rel="stylesheet" href="Main.css">
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
            <a href="enthub.php">
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
            </div>
        );
    }

    function Navbar() {
        const [isDropdownVisible, setDropdownVisible] = useState(false);
        const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

        return (
            <div className="nav-container">
                <div className="nav-title">
                    <img src="enthublogo.png" alt="Logo" height="50" className="logo"/>
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
<header class="header">
    <div class="header-content">
        <div class="logo-container">
            <img src="enthublogo.png" alt="Logo" class="logo" />
        </div>
        <div class="text-container">
            <h1 class="heading">Find a Consultant</h1>
            <a class="subtitle">Expert Care, Advanced Solutions</a>
        </div>
    </div>
</header>
<div class="container">

    <div id="consultant-search-root"></div>
</div>

<script type="text/babel">
    const { useState, useEffect } = React;

    function ConsultantSearch() {
        const [consultants, setConsultants] = useState([]);
        const [searchQuery, setSearchQuery] = useState("");
        const [filteredConsultants, setFilteredConsultants] = useState([]);
        const [speciality, setSpeciality] = useState("");
        const [location, setLocation] = useState("");
        const [date, setDate] = useState("");
        const [sort, setSort] = useState("");

        useEffect(() => {
            // Fetch consultants when the component mounts
            async function fetchConsultants() {
                try {
                    const params = new URLSearchParams({
                        speciality,
                        clinic: location,
                        date,
                        sort
                    });
                    const response = await fetch(`process-consultant-request.php?${params.toString()}`);
                    const data = await response.json();
                    setConsultants(data);
                    setFilteredConsultants(data); // Initialize with all consultants
                } catch (error) {
                    console.error("Error fetching consultants:", error);
                }
            }
            fetchConsultants();
        }, [speciality, location, date, sort]);

        useEffect(() => {
            // Filter consultants based on the search query
            const filtered = consultants.filter(consultant =>
                consultant.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredConsultants(filtered);
        }, [searchQuery, consultants]);

        return (
            <div>
                <div className="select-group">
                    <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                        <option value="">All Specialities</option>
                        <option>Otology</option>
                        <option>Rhinology</option>
                        <option>Laryngology</option>
                        <option>Paediatric ENT</option>
                        <option>Allergy</option>
                        <option>Head and Neck Surgery</option>
                    </select>
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
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
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Sort by</option>
                        <option>Rating</option>
                        <option>Total Recommendations</option>
                        <option>Distance</option>
                    </select>
                    <button onClick={() => window.location.href = 'statistics.php'}>Who should i choose?</button>
                </div>
                <input
                    type="text"
                    placeholder="Search consultants by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <div id="consultant-list">
                    {filteredConsultants.map((consultant) => (
                        <div key={consultant.id} className="consultant-card">
                            <h3>{consultant.name}</h3>
                            <p>Speciality: {consultant.speciality}</p>
                            <p>Location: {consultant.clinic_name}</p>
                            <p className="rating">{consultant.average_score.substring(0,3)}⭐</p>
                            <p>Consultation fee: {consultant.consultation_fee}</p>
                            <button>Book Appointment</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    ReactDOM.createRoot(document.getElementById("consultant-search-root")).render(<ConsultantSearch />);
</script>

<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script src="main.js"></script>
</body>
</html>