// Settings page functionality
document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.querySelector('.save-button');
    if (saveButton) {
        saveButton.addEventListener('click', function () {
            // Here you would typically save the settings to your backend
            alert('Settings saved successfully!');
        });
    }

    // Add event listeners for switches
    const switches = document.querySelectorAll('.switch input');
    if (switches) {
        switches.forEach(switchElement => {
            switchElement.addEventListener('change', function () {
                console.log(this.checked ? 'Enabled' : 'Disabled');
            });
        });
    }

    // Add event listeners for selects
    const selects = document.querySelectorAll('.settings-select');
    if (selects) {
        selects.forEach(select => {
            select.addEventListener('change', function () {
                console.log('Selected:', this.value);
            });
        });
    }

    if (document.getElementById('dark-mode-toggle') != null) {
        document.getElementById('dark-mode-toggle').addEventListener('change', function () {
            if (this.checked) {
                console.log('Dark mode enabled');
                toggleDarkMode(true);
                // Add your dark mode enabling logic here
            } else {
                console.log('Dark mode disabled');
                toggleDarkMode(false);
                // Add your dark mode disabling logic here
            }
        });
    }
});


function toggleDarkMode(enabled) {
    console.log('Dark mode enabled: ' + enabled);
    if (enabled) {
        // $(".settings-section").forEach(section => {section.style.backgroundColor = "#333333"}); // this doesn't work as it is a select all thing
        if ($("#dark-mode-toggle") != null) {
            $("#dark-mode-toggle").prop("checked", true);
        }
        document.getElementsByTagName('body')[0].style.backgroundColor = '#333333';
        document.querySelectorAll('label').forEach(label => {
            label.style.color = '#f9f9f9';
        });
        document.querySelectorAll('.settings-section').forEach(section => {
            section.style.backgroundColor = '#333333';
        });
        document.querySelectorAll('.setting-label').forEach(section => {
            section.style.color = '#f9f9f9';
        });
        document.querySelectorAll('.settings-section h2').forEach(header => {
            header.style.color = '#EB5258';
        });
        document.querySelectorAll('.settings-section h1').forEach(header => {
            header.style.textShadow = '0 1px 1px red';
        });
        document.querySelectorAll('.settings-select').forEach(header => {
            header.style.backgroundColor = '#333333';
        });
        document.querySelectorAll('.settings-select').forEach(header => {
            header.style.color = '#f9f9f9';
        });
        // document.querySelector('.home-btn').style.backgroundColor = '#333333';
        // document.querySelector('.profile-btn').style.backgroundColor = '#333333';
        $(".home-btn").css("background-color", "#333333");
        $(".profile-btn").css("background-color", "#333333");


    } else {
        document.getElementsByTagName('body')[0].style.backgroundColor = '#f9f9f9';
        document.querySelectorAll('label').forEach(label => {
            label.style.color = '#333333';
        });
        document.querySelectorAll('.settings-section').forEach(section => {
            section.style.backgroundColor = '#f9f9f9';
        });
        document.querySelectorAll('.setting-label').forEach(section => {
            section.style.color = '#333333';
        });
        document.querySelectorAll('.settings-section h2').forEach(header => {
            header.style.color = '#A63D40';
        });
        document.querySelectorAll('.settings-select').forEach(header => {
            header.style.backgroundColor = '#f9f9f9';
        });
        document.querySelectorAll('.settings-select').forEach(header => {
            header.style.color = '#333333';
        });
        $('.home-btn').css('background-color', '#f9f9f9');
        // document.querySelector('.home-btn').style.backgroundColor = '#f9f9f9';
        // document.querySelector('.profile-btn').style.backgroundColor = '#f9f9f9';
        $(".profile-btn").css("background-color", "#f9f9f9");
    }
}

function toggleDarkModeHome(enabled) {
    console.log('Dark mode enabled: ' + enabled);
    if (enabled) {
        $(".home-btn").css("background-color", "#333333");
        $(".profile-btn").css("background-color", "#333333");
        $(".flexbox div").css("background-color", "#333333");
        $(".flexbox div").css("color", "aliceblue");
        $(".flexbox div p").css("color", "aliceblue");
        $(".dropdown-menu").css("background-color", "#333333");
        $(".dropdown-item").css("color", "aliceblue");
        $(".upload-box").css("background-color", "rgba(0, 0, 0, 0.5)");
        $(".upload-box > div > button").css("color", "aliceblue");
        $(".upload-box > div > button").css("background-color", "black");
        $(".upload-box > div > p").css("color", "aliceblue");
        $(".upload-box > div > p").css("text-shadow", "#333333 2px 2px 2px");
        $(".upload-box div button").on("mouseover", function () {
            $(".upload-box > div > button").css({
                "background-color": "darkred",
                "transition": "background-color 0.2s"
            });
        });
        $(".upload-box div button").on("mouseout", function () {
            $(".upload-box > div > button").css({
                "background-color": "black",
                "transition": "background-color 0.2s"
            });
        });

    } else {
        $(".home-btn").css("background-color", "#f9f9f9");
        $(".profile-btn").css("background-color", "#f9f9f9");
    }
}


$(".save-button").click(function () {
    const darkMode = $("#dark-mode-toggle").is(":checked");
    sessionStorage.setItem("darkMode", darkMode);
});

toggleDarkMode(sessionStorage.getItem("darkMode") === "true");

$(".home-btn").click(toggleDarkModeHome(sessionStorage.getItem("darkMode") === "true"));


function calculateDistance(pos1, pos2) {
    lat1 = pos1[0];
    lon1 = pos1[1];
    lat2 = pos2[0];
    lon2 = pos2[1];

    const R = 6371; // Radius of the Earth in kilometers
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
}

// LETS DO SOME FETCHING
async function getConsultants() {
    // const specialitySelect = document.getElementById("speciality");
    const locationSelect = document.getElementById("location");
    const dateInput = document.getElementById("date");

    const speciality = specialitySelect.value === "All Specialities" ? "" : specialitySelect.value;
    const location = locationSelect.value === "Any" ? "" : locationSelect.value;
    const date = dateInput.value;

    const queryString = `speciality=${encodeURIComponent(speciality)}&clinic=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`;

    try {
        // Fetch consultants from the server ".
        const response = await fetch(`process-consultant-request.php?${queryString}`);
        const consultants = await response.json();

        // Process consultants (e.g., sort by distance)
        const sort = document.getElementById("sort").value;
        if (sort === "Distance") {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = [position.coords.latitude, position.coords.longitude];

                    consultants.forEach(consultant => {
                        const consultantPos = [consultant.latitude, consultant.longitude];
                        consultant.distance = calculateDistance(userPos, consultantPos);
                    });

                    consultants.sort((a, b) => a.distance - b.distance);
                    displayConsultants(consultants);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }else if(sort === "Rating"){
            consultants.sort((a, b) => b.average_score - a.average_score);
            displayConsultants(consultants);
        }
        else if (sort === "Total Recommendations"){
            consultants.sort((a, b) => b.total_recommendations - a.total_recommendations);
            displayConsultants(consultants);
        } else {
            displayConsultants(consultants);
        }
    } catch (error) {
        console.error("Error fetching consultants:", error);
    }
}

function displayConsultants(consultants) {
    const consultantList = document.getElementById("consultant-list");
    consultantList.innerHTML = ""; // Clear previous results

    consultants.forEach(consultant => {
        // Create a card container
        const card = document.createElement("div");
        card.classList.add("consultant-card");

        // Add consultant name (make it clickable)
        const name = document.createElement("h3");
        name.textContent = consultant.name;
        name.style.cursor = "pointer";
        name.addEventListener("click", () => {
            window.consultantProfile.show(consultant.id);
        });
        card.appendChild(name);

        // Add consultant speciality
        const speciality = document.createElement("p");
        speciality.textContent = "Speciality: " + consultant.speciality;
        card.appendChild(speciality);

        // Add consultant location
        const location = document.createElement("p");
        location.textContent = "Location: " + consultant.clinic_name;
        card.appendChild(location);

        const rating = document.createElement("p");
        rating.classList.add("rating");
        rating.textContent = consultant.average_score.substring(0,3) + "⭐";
        card.appendChild(rating);

        // Add distance if available
        if (consultant.distance !== undefined) {
            const distance = document.createElement("p");
            distance.textContent = `Distance: ${consultant.distance.toFixed(2)} km`;
            card.appendChild(distance);
        }

        // Add a booking button
        const book = document.createElement("button");
        book.textContent = "Book Appointment";
        book.addEventListener("click", () => {
            window.consultantProfile.show(consultant.id);
        });
        card.appendChild(book);

        // Append the card to the consultant list
        consultantList.appendChild(card);
    });
}


function createProfileContainer() {
    const container = document.createElement('div');
    container.id = 'consultant-profile';
    container.className = 'consultant-profile-modal';
    document.body.appendChild(container);
    return container;
}

function isConsultantAvailable(consultant) {
    // Check if the consultant is available

}

document.addEventListener('DOMContentLoaded', function () {
    // Call getConsultants() immediately after the page loads
    // getConsultants();
});

