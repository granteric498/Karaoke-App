$(document).ready(function () {
    (function ($) {
        $.lyricFinder = function (option) {

            var keyword = $('#songInput').val() + " " + $('#artist-input').val();

            let bingApiUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/search';
            var options = $.extend({
                'keyword': '' + 'genius',
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
                            if (array[i].includes('genius') === true) {
                                console.log(response.webPages.value[i].snippet);
                                console.log(response.webPages.value[i].displayUrl);
                                console.log(array[i]);
                                let element = `
                                <div class="lyrics">
                                 <a href="${array[i]}" target="_blank">Click here for full lyrics.</a>
                                </div>
                                `;
                                $('.lyricsResult').html(element);
                            }
                        }
                    }
                },
                error: function (response) {
                    console.log(response.responseJSON);
                    return;
                }
            });
        }
    })(jQuery);

// MusixMatch
$("#select-artist").on("click", function(event) {
    event.preventDefault();
var artistSearch = document.getElementById("artist-input").value;
var trackSearch = document.getElementsByClassName("songInput").value;
document.getElementById("musixLyrics").textContent = "";
  $.ajax({
    type: "GET",
    data: {
        apikey:"445d6196c08dc2b7490929f18149d684",
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
        var thisTrack = data.message.body.track_list[0].track.track_id
        // console.log(thisPic)

        var p = document.createElement("p");
        p.textContent = thisTrack;
        p.id = thisTrack;

        document.getElementById("musixLyrics").appendChild(p).style.opacity = 0;
        document.getElementById("ghost").click();

    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 });

$("#ghost").on("click", function(event) {
    event.preventDefault();
    var trackId = document.getElementById("musixLyrics").textContent;
    console.log(trackId)
  $.ajax({
    type: "GET",
    data: {
        apikey:"445d6196c08dc2b7490929f18149d684",
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
      var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ")+ "...";
       
        var j = document.createElement("p")
        j.textContent = lyricsBody
        document.getElementById("musixLyrics").appendChild(j)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 });

    (function ($) {
        $.wikiFinder = function (option) {

            var keyword = $('#songInput').val() + " " + $('#artist-input').val();

            let bingApiUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/search';
            var options = $.extend({
                'keyword': '' + 'wikipedia',
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
                            if (array[i].includes('wikipedia') === true) {
                                console.log(response.webPages.value[i].snippet);
                                console.log(response.webPages.value[i].displayUrl);
                                console.log(array[i]);
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
                    return;
                }
            });
        }
    })(jQuery);

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
                    return;
                }
            });
        }
    })(jQuery);

    function searchBandsInTown(artist) {

        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var artistName = $("<h1>").text(response.name);
            var artistURL = $("<a>").attr("href", response.url).append(artistName);
            var artistImage = $("<img>").attr("src", response.thumb_url);
            var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
            var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
            var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

            $("#artist-div").empty();
            $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
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
