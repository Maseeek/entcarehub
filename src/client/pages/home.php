<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ENT Care Hub</title>
    <link rel="stylesheet" href="../css/Navbar.css">
    <link rel="stylesheet" href="../css/Main.css">
    <link rel="stylesheet" href="../css/Home.css">
</head>
<body>
<!-- Navbar -->
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
                    <img src="../assets/enthublogo.png" alt="Logo" height="50" className="logo"/>
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

<!-- Landing Page -->
<div class="video-container">
    <video autoplay loop muted class="background-video">
        <source src="../assets/broll.webm" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
<div class="info-section">
    <h1 class="tag">Welcome to ENT Care Hub</h1>
    <!--    <p class="subtitle">Expert Care, Advanced Solutions</p>-->
</div>

<!-- Additional Sections -->
<div class="about-section">
    <h1 class="tagline">Driven by data. Powered by people.</h1>
    <button class="find-consultant-btn" onclick="window.location.href='search.php'">Find a consultant</button>
</div>
<div id="reviews"></div>
<script type="text/babel">
    const { useState, useEffect, useRef } = React;

    const ReviewCarousel = () => {
        const [reviews, setReviews] = useState([]);
        const [isPaused, setIsPaused] = useState(false);
        const carouselRef = useRef(null);

        useEffect(() => {

            // Try to fetch actual reviews
            async function fetchReviews() {
                try {
                    const response = await fetch('../../server/get-reviews.php');
                    if (response.ok) {
                        const data = await response.json();
                        if (data.length > 0) {
                            setReviews(data);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching reviews:", error);
                }
            }

            fetchReviews();
        }, []);

        // Set up automatic scrolling
        useEffect(() => {
            const scrollContainer = carouselRef.current;
            if (!scrollContainer) return;

            let scrollInterval;

            // Function to handle automatic scrolling
            const startScrolling = () => {
                scrollInterval = setInterval(() => {
                    if (scrollContainer && !isPaused) {
                        // Get total width of all items
                        const totalWidth = scrollContainer.scrollWidth;
                        const containerWidth = scrollContainer.clientWidth;

                        if (scrollContainer.scrollLeft + containerWidth >= totalWidth - 100) {
                            // Reset to start when reaching the end
                            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                        } else {
                            // Scroll by a card width
                            scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
                        }
                    }
                }, 3000);
            };

            startScrolling();

            // Clean up interval on unmount
            return () => {
                if (scrollInterval) {
                    clearInterval(scrollInterval);
                }
            };
        }, [isPaused]);

        // Render stars based on score
        const renderStars = (score) => {
            return Array(5).fill(0).map((_, i) => (
                <span key={i} className={`star ${i < score ? 'filled' : 'empty'}`}>★</span>
            ));
        };

        // Render recommendation badge
        const renderRecommendBadge = (recommend) => {
            return (
                <div className={`recommendation-badge ${recommend ? 'recommends' : 'neutral'}`}>
                    {recommend ? 'Recommends' : 'Neutral'}
                </div>
            );
        };

        return (
            <div className="review-container">
                <h2 className="review-heading">Here's what our clients say...</h2>

                <div
                    className="carousel-container"
                    ref={carouselRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            {renderRecommendBadge(review.recommend)}

                            <div className="star-container">
                                {renderStars(review.score)}
                            </div>

                            <p className="review-text">"{review.feedback}"</p>

                            <div className="consultant-info">
                                <p className="consultant-label">Consultant:</p>
                                <p className="consultant-name">{review.consultant_name}</p>
                            </div>
                        </div>
                    ))}

                    {/* Duplicate first few cards to create the illusion of infinite scrolling */}
                    {reviews.slice(0, 3).map((review) => (
                        <div key={`duplicate-${review.id}`} className="review-card">
                            {renderRecommendBadge(review.recommend)}

                            <div className="star-container">
                                {renderStars(review.score)}
                            </div>

                            <p className="review-text">"{review.feedback}"</p>

                            <div className="consultant-info">
                                <p className="consultant-label">Consultant:</p>
                                <p className="consultant-name">{review.consultant_name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="carousel-instructions">
                    <p>Hover over cards to pause</p>
                </div>
            </div>
        );
    };

    ReactDOM.createRoot(document.getElementById("reviews")).render(<ReviewCarousel />);
</script>

</body>
</html>