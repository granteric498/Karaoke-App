$(document).ready(function () {
    (function ($) {
        $.lyricFinder = function (option) {

            var keyword = $('#songInput').val() + " " + $('#artist-input').val();

            let bingApiUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/search';
            var options = $.extend({
                'keyword': '' + 'azlyrics',
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
                            if (array[i].includes('azlyrics') === true) {
                                console.log(response.webPages.value[i].snippet);
                                console.log(response.webPages.value[i].displayUrl);
                                console.log(array[i]);
                                let element = `
                                <br><div class="lyrics">
                                 <a href="${array[i]}" target="_blank">${array[i]}</a>
                                </div>
                                `;
                                $('.lyricsResult').append(element);
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
                                <br><div class="lyrics">
                                 <a href="${array[i]}" target="_blank">${array[i]}</a>
                                </div><br>
                                `;
                                $('.lyricsResult').append(element);
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
                        var link = response.videos.value[0].embedHtml;
                        console.log(link);
                        let element = `
                                <br><div class="video">
                                <a>${link}</a>
                                </div>
                            `;
                        $('.videoResult').append(element);
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

    });
})