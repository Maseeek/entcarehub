<link rel="stylesheet" href="../css/Navbar.css">
<div id="navbar-root"></div>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
    const { useState, useEffect, useRef } = React;

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
                <a href="logout.php" className="dropdown-item">🚪 Logout</a>
            </div>
        );
    }

    function Navbar() {
        const [isDropdownVisible, setDropdownVisible] = useState(false);
        const dropdownRef = useRef(null);

        const toggleDropdown = () => setDropdownVisible((prev) => !prev);

        useEffect(() => {
            const handleClickOutside = (event) => {
                console.log("Document clicked"); // Debugging if the event listener is firing
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    console.log("Clicked outside dropdown"); // Debugging if the click is outside
                    setDropdownVisible(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        return (
            <div className="nav-container">
                <div className="nav-title">
                    <img src="../assets/enthublogo.png" alt="Logo" height="50" className="logo" />
                    <h2 className="title">entcarehub</h2>
                </div>
                <div className="nav-options" ref={dropdownRef}>
                    <HomeButton />
                    <ProfileButton onClick={toggleDropdown} />
                    <DropdownMenu isVisible={isDropdownVisible} />
                </div>
            </div>
        );
    }

    ReactDOM.createRoot(document.getElementById('navbar-root')).render(<Navbar />);
</script>