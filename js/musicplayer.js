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
        $('#spilarinn ul').css('display', 'none');
        
        // Id sett við hvert li á lag 
        var $li = $('#spilarinn ul > li').attr('id', function(i){
            return "lag" + (i + 1);
        });
        
        // Lagalisti búinn til
        var songlist = $li.toArray();

        // Spilari búinn til og sendur
        var player = $("<audio autoplay='autoplay' controls='controls' id='spilari'>");    
        for(var i=0; i<songlist.length; i++){
            $(player).append("<source src='" + songlist[i].textContent + "' />");
        }
        player.append("</audio>");
        $(this).append(player);
        
        // Spilarinn geymdur í breytu
        var spilarinn = document.getElementById('spilari');
        
        // Upphafsstaða spilara
        var playing = pluginOptions.autoPlay;
        
        // Upphafsnúmer lags
        var current_song = 0;
        
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
            
            var curr = songlist[current_song].textContent;
            console.log(curr);
            curr++;
            //document.getElementById("#lag2").play();
        });
        
        // mpCurrent virkni
        var lengd_lags = this.duration;
        var stada_lags = this.currenttime;
        $("#mpCurrent").html(lengd_lags);
        console.log("lengd lagsins er " + lengd_lags);
        console.log("stada lagsins er " + stada_lags);
        
        // $("#mpVolSlider").slider({
            // value: 60,
            // orientation: "horizontal",
            // range: "min",
            // animate: true
        // });
        // $("#mpVolSlider").slider({
            // orientation: "vertical",
            // value: spilarinn.volume,
            // min: 0,
            // max: 1,
            // range: 'min',
            // animate: true,
            // step: .1,
            // slide: function(e, ui) {
                // spilarinn.volume = ui.value;            
            // }
        // });
        var refresh = setInterval(
            function(){
                var curr = songlist[current_song].textContent;
                //$("#mpCurrent").html(curr);
                $("#mpSongList").html(function() {
                    for(var i=0; i<4; i++) {
                        $(this).html('<div>' + songlist[i].textContent +'</div>');
                    }
                });
        }, 1000);
            
      });
   };

})(jQuery);