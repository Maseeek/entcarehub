# ENT Care Hub

A web app for finding ENT (ear, nose and throat) consultants. Patients can filter consultants by speciality, clinic and date, read patient reviews, and see who is rated highest. I built it as a university coursework project.

![ENT Care Hub logo](src/client/assets/enthublogo.png)

## What it does

- Search consultants by name, and filter by speciality, clinic or a date they are free.
- Sort results by average rating or by number of recommendations.
- Show a scrolling carousel of patient reviews on the home page. It pauses when you hover over it.
- Rank consultants on two leaderboards: highest average rating, and highest share of patients who recommend them.
- Open a consultant's profile from the leaderboard to see their clinic and consultation fee.

## How it's built

The frontend is three PHP pages that render React 18 components. React and Babel Standalone load from a CDN and compile JSX in the browser, so there is no build step. The leaderboard page uses plain JavaScript, and jQuery handles some styling. The backend is a set of small PHP scripts that query MySQL through `mysqli` and return JSON.

Some details worth pointing out:

- Availability search. When a date is picked, the server turns it into a weekday, joins the `consultant_schedule` table to find consultants who work that day, and uses a `NOT EXISTS` subquery on `bookings` to drop anyone already booked on that date.
- Filters built on the fly. The search endpoint adds `WHERE` conditions only for the filters the user set, then groups by consultant so the rating and recommendation counts come from `AVG()` and `COUNT()` over the reviews.
- Recommendation rate. The second leaderboard works out each consultant's recommendation percentage in SQL with `COUNT(CASE WHEN ...)`.
- Data model. Six related tables: `consultants`, `specialities`, `clinics`, `reviews`, `consultant_schedule` and `bookings`.

The project is a coursework prototype. The SQL is built by string concatenation rather than prepared statements, the "Book Appointment" button is not wired up, and there is no login. Those would be the first things to fix.

## Project layout

```
src/client/pages/    home.php, search.php, statistics.php
src/client/js/       leaderboard.js, main.js
src/client/css/      page styles
src/server/          PHP endpoints that return JSON
```

## Run it locally

You need PHP with the `mysqli` extension and a MySQL database. The schema and data came from the course and are not in this repo, so you will need to create the six tables above yourself.

1. Clone the repo and put it in your web server's document root (for example XAMPP's `htdocs`).
2. Set your database host, user, password and database name in `src/server/db-config.php`.
3. Open `http://localhost/entcarehub/src/client/pages/home.php`.

Built for academic purposes. Please contact me before reusing the code.
