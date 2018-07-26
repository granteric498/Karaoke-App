// Bing API - Genius Lyrics
$(document).ready(function () {
    (function ($) {
        // Function that was named in HTML. This is the name of the function that will return website for 100% lyrics.
        $.lyricFinder = function (option) {

            // Combines both text inputs into one string
            var keyword = $('#songInput').val() + " " + $('#artist-input').val();

            // Bing API call
            let bingApiUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/search';
            var options = $.extend({
                // Keyword is the variable name for the text input + genius (lyric website)
                'keyword': '' + 'genius',
                'apiKey': '',
            }, option || {});

            $.ajax({
                url: bingApiUrl,
                data: {
                    // query is line 13 (keyword - text input and genius)
                    'q': keyword,
                },
                headers: {
                    // API Key
                    'Ocp-Apim-Subscription-Key': "f0fe1fcadfb74ebe9da2a58432a9bb45"
                },
                success: function (response) {
                    // If function is successful, run the following:
                    if ($.isFunction(options.onSuccess)) {
                        console.log(response);
                        console.log(response.webPages.value);
                        // Create array that will be looped through
                        var array = [];
                        // webPages.value are the URLs to the top 10 websites that Bing results
                        var data = response.webPages.value
                        for (i = 0; i < data.length; i++) {
                            // Adding each url to the array
                            array.push(data[i].url);
                        }
                        console.log(array);
                        // Looping through the array to find the genius website
                        for (i = 0; i < array.length; i++) {
                            // If the item in the array contains genius in its url, that is the url we want.
                            if (array[i].includes('genius') === true) {
                                console.log(response.webPages.value[i].snippet);
                                console.log(response.webPages.value[i].displayUrl);
                                console.log(array[i]);
                                // Creating new variable that contains the genius url that can be clicked to see 100% lyrics.
                                let element = `
                                <div class="lyrics">
                                 <a href="${array[i]}" target="_blank">Click here for full lyrics.</a>
                                </div>
                                `;
                                // Display genius url on page.
                                $('.lyricsResult').html(element);
                            }
                        }
                    }
                },
                // If error, do this.
                error: function (response) {
                    console.log(response.responseJSON);
                    $('.lyricsResult').html("No lyrics found on genius.com!");
                    return;
                }
            });
        }
    })(jQuery);

// MusixMatch API
$("#select-artist").on("click", function(event) {
    // Prevents page from automatically refreshing
    event.preventDefault();
    
    // Defining variables for each text input.
    var artistSearch = document.getElementById("artist-input").value;
    var trackSearch = $('#songInput').val();
    
    // Makes sure the musixLyrics div is empty because we will be using it later.
    document.getElementById("musixLyrics").textContent = "";

    // AJAX Call
  $.ajax({
    type: "GET",
    data: {
        // API Key
        apikey:"445d6196c08dc2b7490929f18149d684",
        // query for artist is the variable from artist input
        q_artist: artistSearch,
        q_track: trackSearch,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log(data);
        console.log(data.message.body.track_list[0].track.track_id); 
        // console.log(data.message.body.track_list[0].track.album_coverart_350x350)
        // console.log(data.message.body.track_list[0].track.lyrics_id)
        // console.log(rand.track.track_id)
        
        // Using song and artist info, we go through the Musixmatch database to find a track id.
        // We will then use this track id to get the lyrics
        var thisTrack = data.message.body.track_list[0].track.track_id
        // console.log(thisPic)

        // Create paragraph tag and save our track id # in it.
        var p = document.createElement("p");
        p.textContent = thisTrack;
        p.id = thisTrack;

        // Hide this track id#
        document.getElementById("musixLyrics").appendChild(p).style.opacity = 0;
        
        // Run ghost button
        document.getElementById("ghost").click();

    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        $('#musixLyrics').html("No track id # found on Musixmatch!");
    }    
  });
 });

 // Run ghost button. This button is "clicked" because two AJAX calls are made to display lyrics
 // First is to find track id #. Second is to use that number to find lyrics.
$("#ghost").on("click", function(event) {
    event.preventDefault();
    // Using the same track id #, we save it into a variable to find the lyrics.
    var trackId = document.getElementById("musixLyrics").textContent;
    console.log(trackId);
  $.ajax({
    type: "GET",
    data: {
        apikey:"445d6196c08dc2b7490929f18149d684",
        // Same variable with track id #
        track_id: trackId,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log(data);
        // console.log(data.message.body.lyrics.lyrics_body); 

        // We have the lyrics, but there is extra information at the end. We split the extra space
        // and keep the first 100 words. We end the lyrics with a "..." to know we have reached the
        // end.
        var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ")+ "...";
       
        // Lyrics are saved in a p tag and displayed in musixLyrics div.
        var j = document.createElement("p")
        j.textContent = lyricsBody
        document.getElementById("musixLyrics").appendChild(j)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        $('#musixLyrics').html("No lyrics found on Musixmatch!");
    }    
  });
 });

 // Bing API - Wikipedia site page for song
    (function ($) {
        $.wikiFinder = function (option) {
            // Keyword = text inputs
            var keyword = $('#songInput').val() + " " + $('#artist-input').val();

            let bingApiUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/search';
            var options = $.extend({
                // Keyword (text inputs) + wikipedia
                'keyword': '' + 'wikipedia',
                'apiKey': '',
            }, option || {});

            $.ajax({
                url: bingApiUrl,
                data: {
                    // Query selector to search in Bing is text inputs and wikipedia
                    'q': keyword,
                },
                headers: {
                    // API Key
                    'Ocp-Apim-Subscription-Key': "f0fe1fcadfb74ebe9da2a58432a9bb45"
                },
                success: function (response) {
                    if ($.isFunction(options.onSuccess)) {
                        console.log(response);
                        console.log(response.webPages.value);
                        // See Bing - Genius for why we use an array
                        var array = [];
                        var data = response.webPages.value
                        for (i = 0; i < data.length; i++) {
                            array.push(data[i].url);
                        }
                        console.log(array);
                        for (i = 0; i < array.length; i++) {
                            // If the link found includes wikipedia, that is the link we want to get
                            if (array[i].includes('wikipedia') === true) {
                                console.log(response.webPages.value[i].snippet);
                                console.log(response.webPages.value[i].displayUrl);
                                console.log(array[i]);
                                // We grab the link in a variable and add it to .wikiResult div in HTML.
                                let element = `
                                <br><div class="wikipedia">
                                 <a href="${array[i]}" target="_blank">${array[i]}</a>
                                </div><br>
                                `;
                                $('.wikiResult').html(element);
                            }
                        }
                    }
                },
                error: function (response) {
                    console.log(response.responseJSON);
                    $('.wikiResult').html("No Wikipedia page found on this song!");
                    return;
                }
            });
        }
    })(jQuery);

    // Bing API - Youtube link
    (function ($) {
        $.videoFinder = function (option) {

            var keyword = $('#songInput').val() + "+" + $('#artist-input').val();

            let bingApiUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/search';
            var options = $.extend({
                'keyword': '' + 'youtube',
                'apiKey': '',
            }, option || {});

            $.ajax({
                url: bingApiUrl,
                data: {
                    'q': keyword,
                },
                headers: {
                    'Ocp-Apim-Subscription-Key': "f0fe1fcadfb74ebe9da2a58432a9bb45"
                },
                success: function (response) {
                    if ($.isFunction(options.onSuccess)) {
                        console.log(response);
                        console.log(response.webPages.value);
                        var array = [];
                        var data = response.webPages.value
                        for (i = 0; i < data.length; i++) {
                            array.push(data[i].url);
                        }
                        console.log(array);
                        for (i = 0; i < array.length; i++) {
                            if (array[i].includes('youtube') === true) {
                                console.log(response.webPages.value[i].snippet);
                                console.log(response.webPages.value[i].displayUrl);
                                console.log(array[i]);
                                // Save youtube link in a variable. This time we are saving the link in a youtube
                                // logo that can be clicked to open youtube video in new tab.
                                let element = `
                                <br><div class="youtube">
                                <a href="${array[i]}" target="_blank"><img src="assets/images/youtubeLogo.png"></img></a>
                                </div><br>
                                `;
                                $('.videoResult').html(element);
                            }
                        }
                    }
                },
                error: function (response) {
                    console.log(response.responseJSON);
                    $('.videoResult').html("No official video found on Youtube!");
                    return;
                }
            });
        }
    })(jQuery);

    // Bands in Town API
    function searchBandsInTown(artist) {

        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            // Artist name
            var artistName = $("<h1>").text(response.name);
            // Link to artist's page
            var artistURL = $("<a>").attr("href", response.url).append(artistName);
            // Image of artist
            var artistImage = $("<img>").attr("src", response.thumb_url);
            // Number of fans tracking artist
            var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
            // Number of upcoming artist's events
            var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
            // Link to see artist's tour dates
            var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

            // Clear artist-div
            $("#artist-div").empty();
            // Add all previous information
            $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
            // Clear text inputs on submit
            $("#artist-input").val("")
            $("#songInput").val("")
        });
    }
    //to prevent default action from happeing and to clear the search bars clicking enter
    $("#select-artist").on("click", function (event) {
        event.preventDefault();
        var inputArtist = $("#artist-input").val().trim();
        searchBandsInTown(inputArtist);
    })
})
