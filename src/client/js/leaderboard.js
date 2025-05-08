async function leaderboardByRating() {
    const response = await fetch(`../../server/process-leaderboard-request.php`);
    const consultants = await response.json();
    displayRatings(consultants);
}

function displayRatings(consultants) {
    // Select the "Highest Rating" leaderboard container
    const leaderboard = document.querySelector("section:nth-of-type(2) .leaderboard");

    // Clear existing rows (except the header)
    const rows = leaderboard.querySelectorAll(".leaderboard-row:not(.header)");
    rows.forEach(row => row.remove());

    // Insert new rows for each consultant
    consultants.forEach((consultant, index) => {
        const row = document.createElement("div");
        row.classList.add("leaderboard-row");

        // Rank column
        const rank = document.createElement("div");
        rank.classList.add("rank");
        rank.textContent = index + 1;
        row.appendChild(rank);

        // Name column
        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = consultant.name;
        row.appendChild(name);

        // Score column
        const score = document.createElement("div");
        score.classList.add("score");
        score.textContent = consultant.average_score.toString().substring(0, 3) + "⭐";
        if(consultant.average_score > 4.0){
            score.style.color = "green";
        }
        else if(consultant.average_score >= 3){
            score.style.color = "orange";
        }
        else{
            score.style.color = "red";
        }
        row.appendChild(score);

        // Append the row to the leaderboard
        leaderboard.appendChild(row);
    });
}
async function leaderboardByRecommendation() {
    const response = await fetch(`../../server/process-leaderboard1-request.php`);
    const consultants = await response.json();
    displayRecommendations(consultants);
}

function displayRecommendations(consultants) {
    const leaderboard = document.querySelector("section:nth-of-type(1) .leaderboard");
    const rows = leaderboard.querySelectorAll(".leaderboard-row:not(.header)");
    rows.forEach(row => row.remove());

    consultants.forEach((consultant, index) => {
        const row = document.createElement("div");
        row.classList.add("leaderboard-row");

        const rank = document.createElement("div");
        rank.classList.add("rank");
        rank.textContent = index + 1;
        row.appendChild(rank);

        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = consultant.name;
        row.appendChild(name);

        const recommendations = document.createElement("div");
        recommendations.classList.add("recommendations");
        recommendations.textContent = `Total: ${consultant.total_recommendations}`;
        row.appendChild(recommendations);

        const score = document.createElement("div");
        score.classList.add("score");
        score.textContent = `${consultant.recommendation_percentage.toString().substring(0, 5)}%`;
        if(consultant.recommendation_percentage > 70){
            score.style.color = "green";
        }
        else if(consultant.recommendation_percentage >= 50){
            score.style.color = "orange";
        }
        else{
            score.style.color = "red";
        }
        row.appendChild(score);



        leaderboard.appendChild(row);
    });
}

// Fetch and display both leaderboards on page load
leaderboardByRating();
leaderboardByRecommendation();