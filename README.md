# Orangehill - URL Compressor

## How to use
The website is divided into three major components - header, footer, and the main panel.
The header includes the website's title and the logo (it's a logo, not a button).
The footer provides a link to the GitHub repository.
The main panel is the focus point of interaction.
The first input line is for the URL that shall be compressed.
It only takes valid URLs as input (include the `http://` or `https://`).
The second field determines the time til this shortened link expires.
The default value is 12 hours from once you hit compress on.
It's a dropdown, and you have to select an option.
The third field is limits the maximum number of uses for a link.
This is set to "No limit" by default.
If it is set to any other value, that link can only be used so many times.
This is great for e.g. one-time access.
Afterwards you just hit the "Compress URL!"-button and your link is generated.
It will appear in the field "Compressed URL". If you click on it, it automatically selects the whole link.
Otherwise, you can hit the button "Copy!" and the link will automatically be copied to your clipboard.
This is indicated by the buttons text changing to "Copied!" for two seconds.
The website works on mobile devices as well - in portrait and landscape mode.

To access the demo location simply click on the provided [link](https://url-compressor.vani.ga)

## How it works
A URL Compressor works by mapping a long URL onto a shorter one.
How to map these URLs is up to the system's designer. <br>
In this project the core idea is to map each incoming URL onto a six char base62 string.
Furthermore, users have the option to set expiry dates for their links as well as limiting their number of uses.

### Project structure
For clarity the project has been divided into the client and server code.
(Even though for deployment purposes the built client applications is bundled into the server.)
This project follow the Model-view-controller (MVG) design pattern. 
Usage of this pattern allows for easy extendability as well as improving readability - a place for everything, and everything in its place.


#### Client
The client code only handles the website as well as sending the users request for a new shortened link to the server.
No critical functionality is executed clientside.
The website itself broadly follows the State of Hawaii's [Web Style Guide](https://styleguide.ehawaii.gov/themes/) and
is inspired by the Makai theme.
Furthermore, it is optimized for mobile devices.

#### Server
The server is basically an express REST api.
On creation requests the input constraints are checked, and if met a new shortened url is generated and stored in the database.
On shortened url requests the specified value is looked up in the database.
If it is found the user is redirected to the associated url. It not the user is redirected back to the main page and receives an error message.
On redirect to the associated url the use count is diminished by one and the entry deleted, if now no uses are left.


The following two sections describe two critical elements of the system in greater detail:

### Random ID
To compress the URL we represent each site as a six char value in base62.
This allows for up to `pow(62, 6) = 56,800,235,584` distinct addresses.
Furthermore, base62 is still easily read- and typeable.
Current estimations put the amount of websites globally at roughly 2 billion. So this is more than sufficient.
Generation of these values is handled serverside to prevent tempering like intended collisions.
To prevent cases of naturally occurring collisions after generation of a value a request for the associated redirect is
made. Should this not turn out a 404 the value will be regenerated. Applying this procedure is still efficient, because
natural collisions should be fairly seldom.

### Data storage
The project utilizes SQLite for the database. SQLite is a lightweight sql database.
The database contains only one table.
Besides the URL each entry holds the assigned shorthand id value, an expiration date, as well as a use counter.
By default, links are set to expire after twelve hours and can be used an unlimited amount of times.
Every time you access a shortened url the count is diminished by one (if you have set a finite count).
Once an entry has expired, or it ran out of uses the corresponding entry in the database is automatically deleted.
This limits the database's size, the chance for value collisions, and misuse for the propagation of harmful URLs.
