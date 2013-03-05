/*
        HomeWork Assignment - jQuery plugin - Mars 2013

        Reykjavik University  -  http://www.ru.is
    Course:
        WebProgrammin II - T-427-WEPO
    Authors:
        Anton Sigurdsson    antons11@ru.is
        Sigurdur Jonsson    sigurdurjon11@ru.is

*/

(function($){

    $.fn.musicPlayer = function( options ) {
        
        var pluginOptions = {
            autoPlay: true,
            defaultVolume: 60,
            compact: true
            };

        if ( options ) { $.extend( pluginOptions, options ) }
        
        return this.each( function( ) {
          
            // Div � s��u
            $('#playermain ul').wrap('<div id="list"></div>');
            $('#playermain ul').after('<div id="listbottom"></div>');
            
            // Id sett vi� hvert li � lag 
            var $li = $('#playermain ul > li').attr('id', function(i){
                return  (i);
            });      
            
            // Lagalisti b�inn til
            var songlist = $li.toArray();

            // Upphafssta�a spilunar 
            var playing = pluginOptions.autoPlay;
            console.log(playing);
            merkjaLag(current_song);
            if(playing == true) {
                var autop = "autoplay";
            }
            else {
                var autop = "";
            }

            // Upphafsn�mer lags        
            var current_song = 0;

            // Spilari b�inn til og sendur
            var player = $("<audio " + autop + " controls='controls' id='spilari'>");
            $(player).append("<source src='" + songlist[current_song].textContent + "' />");
            player.append("</audio>");
            $(this).append(player);
            
            // Merkja lag � spilun
            function merkjaLag(id) {
                var hl = "#" + id;
                var hlf = $(hl);
                for(var i = 0; i < songlist.length; i++) {
                    var x = "#" + i;
                    var xx = $(x);
                    xx.css({'background-color':''});
                }
                hlf.css({'background-color':'#979771'});
            }

            // Spilarinn geymdur � breytu
            var spilarinn = document.getElementById('spilari');
            
            // Upphafsstilling hlj��styrks
            spilarinn.volume = pluginOptions.defaultVolume/100;

            // Divum b�tt vi� � spilarabreytu
            $(this).append(
                    '<div id="oval">'                                   +
                    '<div id="mpPlay" class="button"></div>'            +
                    '<div id="mpList" class="button"></div>'            +
                    '<div id="mpNext" class="button"></div>'            +
                    '<div id="mpPrev" class="button"></div>'            +
                    '<div id="mpVolUp" class="button"></div>'           +
                    '<div id="mpVolDn" class="button"></div>'           +
                    '<div id="mpCurrPos_progr"></div>'                  +
                    '<div id="probottom"></div>'                        +
                    '<div id="mpProgress" class="button"></div>'        +
                    '<div id="mpleft" class="button"></div>'            +
                    '<div id="mpright" class="button"></div>'           +
                    '</div>'
            );

            // Upphafsstilling � compact
            if(pluginOptions.compact == false) {
                $("#list").fadeToggle(1500);
            };

            // Spilar lag sem smellt er � � lagalista.
            $('#playermain ul li').click( function() {
                spilarinn.pause();
                current_song = parseInt($(this).attr('id'));
                merkjaLag(current_song);
                $(player).html("<source src='" + songlist[current_song].textContent + "' />");
                playing = true;
                spilarinn.play();
            });

            // Play-Pause takka virkni
            $("#mpPlay").click( function() { 
                console.log("playing: " + playing);
                if(playing == false) {
                    spilarinn.play();
                    playing = true;
                    merkjaLag(current_song);
                }
                else {
                    spilarinn.pause();
                    playing = false;
                }
                console.log("playing: " + playing);
            });

            // Show-Hide lagalista
            $("#mpList").click( function() {
               $("#list").fadeToggle(1500);
            });

            // Volume up virkni
            $("#mpVolUp").click( function() {
                console.log(spilarinn.volume);
                if(spilarinn.volume > 0.9) {
                    spilarinn.volume = 1;
                }
                else {
                    spilarinn.volume += 0.1;
                }
            });
            
            // Volume down virkni
            $("#mpVolDn").click( function() { 
                if(spilarinn.volume < 0.1) {
                    spilarinn.volume = 0;
                }
                else {
                    spilarinn.volume -= 0.1;
                }    
            });
            
            // Next virkni
            $("#mpNext").click( function() {
                spilarinn.pause();

                if(current_song < songlist.length - 1) {
                    current_song++;             
                }
                else {
                    current_song = 0;
                }
                merkjaLag(current_song);
                $(player).html("<source src='" + songlist[current_song].textContent + "' />");
                spilarinn.play();
            });

            // Previous virkni
            $("#mpPrev").click( function() {
                spilarinn.pause();
                if(current_song != 0) {
                    current_song--;
                }
                merkjaLag(current_song);
                $(player).html("<source src='" + songlist[current_song].textContent + "' />");
                spilarinn.play();
            });

            // Sp�la hratt fram og til baka
            $("#mpleft").click( function() {
                spilarinn.currentTime -=5.0;
            });
            $("#mpright").click( function() {
                spilarinn.currentTime +=5.0;
            });
            
            // Tekur inn t�malengt � sek�ndum og skilar strengi � forminu "m:ss"
            function lagaTima(timi){
                min = Math.floor(timi / 60);
                sek = Math.floor(timi % 60);
                if(sek < 10) {
                    sek = "0" + sek;            
                }
                return min + ":" + sek;
            };
            
            // Spilar n�sta lag � lista �egar lag h�ttir
            spilarinn.addEventListener("ended", function() {
                if(current_song < songlist.length-1) {
                    current_song++;
                    $(player).html("<source src='" + songlist[current_song].textContent + "' />");
                    merkjaLag(current_song);
                    spilarinn.play();
                }
            });
            
            // Uppf�rir lifandi div � spilara
            function updatePlayerStatus(stada, len) {            
                $('#mpCurrPos_progr').html(lagaTima(len)+" / "+lagaTima(stada));
                $('#mpProgress').html('<img src="css/images/progr.png" height="12px"'+" width="+(stada/len)*118+"px"+'/>');
            };
            
            // Uppf�rir st��u lifandi breyta
            var refresh = setInterval( function() {
                    stada_lags = spilarinn.currentTime;
                    lengd_lags = spilarinn.duration;
                    updatePlayerStatus(stada_lags, lengd_lags);
            }, 500);      
        });
    };

})(jQuery);