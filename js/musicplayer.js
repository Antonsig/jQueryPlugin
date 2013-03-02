(function($){
  $.fn.musicPlayer = function( options ) {
        
    var pluginOptions = {
      autoPlay: false,
      defaultVolume: 100,
      compact: false
      };

    if ( options ) { $.extend( pluginOptions, options ) }
    
    return this.each( function( ) {
      
        // Fela default spilarann
        //$('#spilarinn').css('display', 'none');
        //$('#spilarinn ul').css('display', 'none');
        
        // Id sett vi� hvert li � lag 
        var $li = $('#spilarinn ul > li').attr('id', function(i){
            return "lag" + (i);
        });
        
        // Lagalisti b�inn til
        var songlist = $li.toArray();
        
        // Upphafsn�mer lags        
        var current_song = 0;
        
        // N�� � id spilandi lags
        var hl = "#lag" + current_song;
        console.log(hl);
        var hlf = $(hl);
        
        
        // Spilari b�inn til og sendur
        var player = $("<audio autoplay='autoplay' controls='controls' id='spilari'>");    
        for(var i=0; i<songlist.length; i++){
            $(player).append("<source id='lag" + i + "' src='" + songlist[i].textContent + "' />");
            
            hlf.css({'background-color':'yellow'});
        }
        player.append("</audio>");
        $(this).append(player);
        
        // Spilarinn geymdur � breytu
        var spilarinn = document.getElementById('spilari');
        
        // Upphafssta�a spilara
        var playing = pluginOptions.autoPlay;
        


        
        var refresh_timer = 1000;
               
        $(this).after(  '<a id="mpPlay" href="#">Play</a><br/>'     +
                        '<a id="mpVolUp" href="#">Vol+</a><br/>'    +
                        '<a id="mpVolDn" href="#">Vol-</a><br/>'    +
                        '<a id="mpNext" href="#">Next</a><br/>'     +
                        '<a id="mpPrev" href="#">Prev</a><br/>'     +
                        '<div id="mpCurrent" >1</div>'               +
                        '<div id="mpSongList"></div>'
                        // '<div id="mpVolSlider"></div>' 
        );

        // Play/Pause takka virkni
        $("#mpPlay").click( function() { 
            if(!playing) {
                spilarinn.play();
                playing = true;
            }
            else {
                spilarinn.pause();
                playing = false;
            }
        });
        // Volume up virkni
        $("#mpVolUp").click( function() { spilarinn.volume += 0.1; });
        // Volume down virkni
        $("#mpVolDn").click( function() { spilarinn.volume -= 0.1; });
        // Next virkni
        $("#mpNext").click( function() {
            current_song++;
            var nextsong = spilarinn.next();
            nextsong.play();
            

            
        });
        
        // mpCurrent virkni
        var lengd_lags = this.duration;
        var stada_lags = this.currenttime;
        $("#mpCurrent").html(lengd_lags);

        ////// Gamla Listinn af l�gum ////////
        // function showSongList(highlight){
            // var mylist = $("<div id='lagalisti'></div>");
            // for (var i=0; i<songlist.length; i++) {
                // $(mylist).append("<div id=lag" + i + ">" + songlist[i].textContent + "</div>");
            // };

            // //console.log(hlf);
            // // console.log($("#mpPlay"));
            // // var temp = hlf.innerHTML();
            // var temp2 = $('#lag1')
            // console.log(temp2);
            // // console.log("temp er: " + temp);
            // $('#lag1').css({'background-color':'yellow'});
            // $("#mpSongList").html(mylist);
        // }
        // showSongList(current_song);
        
        var refresh = setInterval(
            function(){
                //console.log(songlist.length);
                var curr = songlist[current_song].textContent;
                //console.log("current er: " + curr);

                
                // $("#mpCurrent").html(curr);
                
                    // for (var i=0; i<songlist.length; i++) {
                        // $("#mpSongList").html(function() {
                            // var thelist
                        // // $(this).html('<div>' + songlist[i].textContent +'</div>');
                        // // // console.log(songlist[i].textContent);
                         // // // $(this).html('<div>' + i +'</div>');
                        // });
                    // }
                    
            }, 1000);
            
      });
   };

})(jQuery);