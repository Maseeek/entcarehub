<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="Main.css">
    <link rel="stylesheet" href="Navbar.css">
    <link rel="stylesheet" href="Statistics.css">
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
            <h1 class="heading">Leaderboard</h1>
            <a class="subtitle">Expert Care, Advanced Solutions</a>
        </div>
    </div>
</header>

<main>
    <div class="leaderboard-container">
        <section>
            <h3>Most Recommended</h3>
            <div class="leaderboard">
                <div class="leaderboard-row header">
                    <div class="rank">Rank</div>
                    <div class="name">Name</div>
                    <div class="recommendations">Total Recommendations</div>
                    <div class="score">Score</div>


                </div>
                <div class="leaderboard-row">
                    <div class="rank">1</div>
                    <div class="name">Doctor 1</div>
                    <div class="score">95</div>
                </div>
                <div class="leaderboard-row">
                    <div class="rank">2</div>
                    <div class="name">Doctor 2</div>
                    <div class="score">90</div>
                </div>
                <div class="leaderboard-row">
                    <div class="rank">3</div>
                    <div class="name">Doctor 3</div>
                    <div class="score">85</div>
                </div>
            </div>
        </section>
        <section>
            <h3>Highest Rating</h3>
            <div class="leaderboard">
                <div class="leaderboard-row header">
                    <div class="rank">Rank</div>
                    <div class="name">Name</div>
                    <div class="score">Score</div>
                </div>
                <div class="leaderboard-row">
                    <div class="rank">1</div>
                    <div class="name">Doctor A</div>
                    <div class="score">4.9</div>
                </div>
                <div class="leaderboard-row">
                    <div class="rank">2</div>
                    <div class="name">Doctor B</div>
                    <div class="score">4.8</div>
                </div>
                <div class="leaderboard-row">
                    <div class="rank">3</div>
                    <div class="name">Doctor C</div>
                    <div class="score">4.7</div>
                </div>
            </div>
        </section>
    </div>
</main>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="leaderboard.js"></script>
<script src="main.js"></script>
</body>
</html>