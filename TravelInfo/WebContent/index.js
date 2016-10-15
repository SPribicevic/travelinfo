 /*
     * Date Format 1.2.3
     * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
     * MIT license
     *
     * Includes enhancements by Scott Trenda <scott.trenda.net>
     * and Kris Kowal <cixar.com/~kris.kowal/>
     *
     * Accepts a date, a mask, or a date and a mask.
     * Returns a formatted version of the given date.
     * The date defaults to the current date/time.
     * The mask defaults to dateFormat.masks.default.
     */

    var dateFormat = function () {
        var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };
    
        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;
    
            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }
    
            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");
    
            mask = String(dF.masks[mask] || mask || dF.masks["default"]);
    
            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }
    
            var    _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };
    
            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();
    
    // Some common format strings
    dateFormat.masks = {
        "default":      "ddd mmm dd yyyy HH:MM:ss",
        shortDate:      "m/d/yy",
        mediumDate:     "mmm d, yyyy",
        longDate:       "mmmm d, yyyy",
        fullDate:       "dddd, mmmm d, yyyy",
        shortTime:      "h:MM TT",
        mediumTime:     "h:MM:ss TT",
        longTime:       "h:MM:ss TT Z",
        isoDate:        "yyyy-mm-dd",
        isoTime:        "HH:MM:ss",
        isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };
    
    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };
    
    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };

var countries = ["Afghanistan",		// var which contains list of all countries
"Albania",
"Algeria",
"American Samoa",
"Andorra",
"Angola",
"Anguilla",
"Antarctica",
"Antigua and Barbuda",
"Argentina",
"Armenia",
"Aruba",
"Australia",
"Austria",
"Azerbaijan",
"Bahamas",
"Bahrain",
"Bangladesh",
"Barbados",
"Belarus",
"Belgium",
"Belize",
"Benin",
"Bermuda",
"Bhutan",
"Bolivia",
"Bosnia and Herzegovina",
"Botswana",
"Bouvet Island",
"Brazil",
"British Antarctic Territory",
"British Indian Ocean Territory",
"British Virgin Islands",
"Brunei",
"Bulgaria",
"Burkina Faso",
"Burundi",
"Cambodia",
"Cameroon",
"Canada",
"Canton and Enderbury Islands",
"Cape Verde",
"Cayman Islands",
"Central African Republic",
"Chad",
"Chile",
"China",
"Christmas Island",
"Cocos [Keeling] Islands",
"Colombia",
"Comoros",
"Congo - Brazzaville",
"Congo - Kinshasa",
"Cook Islands",
"Costa Rica",
"Croatia",
"Cuba",
"Cyprus",
"Czech Republic",
"Côte d’Ivoire",
"Denmark",
"Djibouti",
"Dominica",
"Dominican Republic",
"Dronning Maud Land",
"East Germany",
"Ecuador",
"Egypt",
"El Salvador",
"Equatorial Guinea",
"Eritrea",
"Estonia",
"Ethiopia",
"Falkland Islands",
"Faroe Islands",
"Fiji",
"Finland",
"France",
"French Guiana",
"French Polynesia",
"French Southern Territories",
"French Southern and Antarctic Territories",
"Gabon",
"Gambia",
"Georgia",
"Germany",
"Ghana",
"Gibraltar",
"Greece",
"Greenland",
"Grenada",
"Guadeloupe",
"Guam",
"Guatemala",
"Guernsey",
"Guinea",
"Guinea-Bissau",
"Guyana",
"Haiti",
"Heard Island and McDonald Islands",
"Honduras",
"Hong Kong SAR China",
"Hungary",
"Iceland",
"India",
"Indonesia",
"Iran",
"Iraq",
"Ireland",
"Isle of Man",
"Israel",
"Italy",
"Jamaica",
"Japan",
"Jersey",
"Johnston Island",
"Jordan",
"Kazakhstan",
"Kenya",
"Kiribati",
"Kuwait",
"Kyrgyzstan",
"Laos",
"Latvia",
"Lebanon",
"Lesotho",
"Liberia",
"Libya",
"Liechtenstein",
"Lithuania",
"Luxembourg",
"Macau SAR China",
"Macedonia",
"Madagascar",
"Malawi",
"Malaysia",
"Maldives",
"Mali",
"Malta",
"Marshall Islands",
"Martinique",
"Mauritania",
"Mauritius",
"Mayotte",
"Metropolitan France",
"Mexico",
"Micronesia",
"Midway Islands",
"Moldova",
"Monaco",
"Mongolia",
"Montenegro",
"Montserrat",
"Morocco",
"Mozambique",
"Myanmar [Burma]",
"Namibia",
"Nauru",
"Nepal",
"Netherlands",
"Netherlands Antilles",
"Neutral Zone",
"New Caledonia",
"New Zealand",
"Nicaragua",
"Niger",
"Nigeria",
"Niue",
"Norfolk Island",
"North Korea",
"North Vietnam",
"Northern Mariana Islands",
"Norway",
"Oman",
"Pacific Islands Trust Territory",
"Pakistan",
"Palau",
"Palestinian Territories",
"Panama",
"Panama Canal Zone",
"Papua New Guinea",
"Paraguay",
"People's Democratic Republic of Yemen",
"Peru",
"Philippines",
"Pitcairn Islands",
"Poland",
"Portugal",
"Puerto Rico",
"Qatar",
"Romania",
"Russia",
"Rwanda",
"Réunion",
"Saint Barthélemy",
"Saint Helena",
"Saint Kitts and Nevis",
"Saint Lucia",
"Saint Martin",
"Saint Pierre and Miquelon",
"Saint Vincent and the Grenadines",
"Samoa",
"San Marino",
"Saudi Arabia",
"Senegal",
"Serbia",
"Serbia and Montenegro",
"Seychelles",
"Sierra Leone",
"Singapore",
"Slovakia",
"Slovenia",
"Solomon Islands",
"Somalia",
"South Africa",
"South Georgia and the South Sandwich Islands",
"South Korea",
"Spain",
"Sri Lanka",
"Sudan",
"Suriname",
"Svalbard and Jan Mayen",
"Swaziland",
"Sweden",
"Switzerland",
"Syria",
"Sao Tomé and Príncipe",
"Taiwan",
"Tajikistan",
"Tanzania",
"Thailand",
"Timor-Leste",
"Togo",
"Tokelau",
"Tonga",
"Trinidad and Tobago",
"Tunisia",
"Turkey",
"Turkmenistan",
"Turks and Caicos Islands",
"Tuvalu",
"U.S. Minor Outlying Islands",
"U.S. Miscellaneous Pacific Islands",
"U.S. Virgin Islands",
"Uganda",
"Ukraine",
"Union of Soviet Socialist Republics",
"United Arab Emirates",
"United Kingdom",
"United States",
"Unknown or Invalid Region",
"Uruguay",
"Uzbekistan",
"Vanuatu",
"Vatican City",
"Venezuela",
"Vietnam",
"Wake Island",
"Wallis and Futuna",
"Western Sahara",
"Yemen",
"Zambia",
"Zimbabwe",
"Aland Islands"];

var loggedIn = false;

$( document ).ready(function(){		// when ready, add options to select for countries

	addOptions();
	checkUserSession();

});

function addOptions(){				// adding options to select for countries
	for(var country in countries) {
		$( "#selectCountry" ).append(
			$('<option val="'+ countries[country] +'">'+ countries[country] +'</option>')
		);
	}
}

function checkUserSession(){
	$.ajax({
		url: "rest/travelinfo/",
		type: "GET",
		complete: function(data){
			console.log(data.responseText);
			setLoginLink(data.responseText);
		}
	});
}

function setLoginLink(data){
	var login = jQuery.parseJSON(data);
	if(login.status){
		$( "#mainHeaderLink" ).text( "Zdravo, " + login.user );
		logedIn = true;
	}
}

function getPosts(){								// making ajax call and getting all posts for that country
	var country = $ ( "#selectCountry option:selected" ).text();

	$( "#mainContent" ).children().hide();
	$( "#regLog" ).children().hide();
	$( "#posts" ).show();
	
	console.log(country);
	
	$.ajax({
		url: "rest/travelinfo/country/" + country,
		type: "GET",
		complete: function(data){
			console.log(data.responseText);
			printPosts(jQuery.parseJSON(data.responseText));
		}
	});
}

function printPosts(posts){		// transforming json post into the html
	console.log(posts);
	$ ( "#posts" ).children().remove();
	$( "#posts" ).append(
			"<div id='newPost'>" +
			"<input type='button' class='button' id='newPostBtn' value='Napravi novi post' onclick='showNewPostSection()' />" +
			"</div>"
	);
	for(var post in posts){
		var text = posts[post].text;
		var id = posts[post].id;
		var date = new Date(posts[post].time);
		var title = posts[post].title;
		var username = posts[post].username;
		
		$( "#posts" ).append(
				"<article onclick='showPostText(\""+ text +"\", \""+ id +"\");'>" +
				"<p id='header'>" + title + "</p>" +
				"<div id='text"+ id +"'></div>" + 
				"<p id='date'> Datum kreiranja teksta: " + date.format("hh:mm:ss dd-mm-yy")  + "</p>" +
				"<p id='user'>Tekst kreirao: " + username  + "</p>" +
				"<input id='post_id' type='hidden' value= '"+ id +"'/>" +
				"</article>"
		);
		
		$( "#text" + id ).hide();
	}
}

function showNewPostSection(){
	$( "#newPost" ).children().remove();
	$( "#newPost" ).append(
			"<div>"+
			"<fieldset>"+
			'<legend>Kreiraj tekst:</legend>' +
			'<p>Naslov teksta:</p>' +
			'<input type="text" id="postTitle">' + 
			'<p>Tekst:</p>' +
			'<textarea id="postText" rows="10" cols="50"/>' +
			'<br>' +
			'<p class="msg" id="postMsg"></p>' +
			'<input class="button" type="button" onclick="sendPost()" value="Postuj tekst">' +
			"<fieldset/>"+
			"</div>"
	);
}

function sendPost(){
	var title = $( "#postTitle" ).val();
	var text = $( "#postText" ).val();
	
	console.log(title);
	console.log(text);
	
	$( "#postMsg" ).empty();
	
	if(title == ""){
		$( "#postMsg" ).text( "Morate uneti naslov teksta!" );
	} else {
		if(text == ""){
			$( "#postMsg" ).text( "Morate uneti tekst!" );
		} else{
			sendPostAjax(title, text);
		}
	}
}

function sendPostAjax(title, text){
	var country = $ ( "#selectCountry option:selected" ).text();
	var postJSON = new Object();
	
	postJSON.title = title;
	postJSON.text = text;
	postJSON.country = country;
	
	$.ajax({
		url: "rest/travelinfo/newpost",
		type: "POST",
		data: JSON.stringify(postJSON),
		contentType: "application/json",
		complete: function(data){
			
		}
	});
	
	getPosts();
}

function showPostText(text, id){
	console.log(text);
	if( $( "#text" + id ).children().length > 0 ){
		$( "#text" + id ).fadeOut("slow");
		$( "#text" + id ).children().remove();
	} else {
		$( "#text" + id ).append(
				"<p>"+ text +"</p>"
		);
		$( "#text" + id ).fadeIn("slow");
	}
}

function showRegLogForm(){		// 'Log / Reg' link click
	
	$( "#mainContent" ).children().hide();
	$( "#posts" ).children().hide();
	$( "#regLog" ).children().remove();
	
	$( "#regLog" ).append(
			$('<fieldset id="logIn">' +
			'<legend>Logovanje:</legend>' +
			'<p>Korisničko ime:</p>' +
			'<input type="text" id="logUser">' + 
			'<p>Lozinka:</p>' +
			'<input type="password" id="logPass">' + 
			'<br>' +
			'<p class="msg" id="logMsg"></p>' +
			'<input class="button" type="button" onclick="login()" value="Uloguj se">' +
		'</fieldset>')
	);
	
	$( "#regLog" ).append(
			$('<fieldset id="signUp">' +
			'<legend>Registracija:</legend>' +
			'<p>Korisničko ime:</p>' +
			'<input type="text" id="regUser">' + 
			'<p>Lozinka</p>:' +
			'<input type="password" id="regPass">' + 
			'<p>Email:</p>' +
			'<input type="text" id="regEmail">' + 
			'<br>' +
			'<p class="msg" id="regMsg"></p>' +
			'<input class="button" type="button" onclick="register()" value="Registruj se">' +
		'</fieldset>')
	);
	
}

function home(){		// handling the home link
	$( "#mainContent" ).children().show();
	$( "#regLog" ).children().hide();
	$( "#posts" ).hide();
}

function login(){			// handle login button
	var user = $( "#logUser" ).val();
	var pass = $( "#logPass" ).val();
	
	/*console.log(user);
	console.log(pass);*/
	
	if(user == ""){
		$( "#logMsg" ).text( "Morate uneti korisničko ime!" );
	} else {
		if(pass == ""){
			$( "#logMsg" ).text( "Morate uneti lozinku!" );
		} else{
			logUser(user, pass);
		}
	}
}

function logUser(user, pass){
	var login = new Object();
	login.user = user;
	login.pass = pass;
	loginJSON = JSON.stringify(login);
	
	$.ajax({
		url: "rest/travelinfo/login",
		type: "POST",
		data: loginJSON,
		contentType: "application/json",
		dataType: "json",
		complete: function(data){
			console.log(data.responseText);
			parseLoginData(data.responseText);
		}
	});
}

function parseLoginData(logData){
	var log = jQuery.parseJSON(logData);
	var user = $( "#logUser" ).val();
	
	if(!log.status){
		$( "#logMsg" ).text( log.message );
	} else {
		$( "#mainHeaderLink" ).text( "Zdravo, " + user );
		$( "#mainHeaderLink" ).click( getUserProfile() );
		
		$( "#mainContent" ).children().show();
		$( "#regLog" ).children().hide();
		$( "#posts" ).hide();
	}
}

function validateEmail(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
}

function register() {		// registering user
	
	var	user = $( "#regUser" ).val();
	var pass = $( "#regPass" ).val();
	var email = $( "#regEmail" ).val();
	
	if(user == ""){
		$( "#regMsg" ).text( "Morate uneti korisničko ime" );
	} else if(pass == "") {
		$( "#regMsg" ).text( "Morate uneti lozinku" );
	} else if(email == "") {
		$( "#regMsg" ).text( "Morate uneti email" );
	} else if(! validateEmail(email)) {
		$( "#regMsg" ).text( "Morate uneti validan email" );
	} else {
		var regData = new Object();
		regData.user = user;
		regData.pass = pass;
		regData.email = email;
		
		$.ajax({
			url: "rest/travelinfo/register",
			type: "POST",
			data: JSON.stringify(regData),
			contentType: "application/json",
			complete: function(data){
				parseRegisterData(data.responseText);
			}
		});
	}
	
}

function parseRegisterData(regData){
	var reg = jQuery.parseJSON(regData);
	
	if(!reg.status){
		$( "#regMsg" ).text( log.message );
	} else {
		$( "#regUser" ).val("");
		$( "#regPass" ).val("");
		$( "#regEmail" ).val("");
		$( "#regMsg" ).text( "Usepšna registracija. Molimo da se ulogujete." );
	}
}

function getUserProfile(){
	// TODO
}