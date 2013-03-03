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
        //$('#playermain ul').css('display', 'none');
        $('#spilari').css('display', 'none');
        $('#playermain ul').css('position', 'absolute');
        $('#playermain ul').css('top', '200px');
        
        // Id sett við hvert li á lag 
        var $li = $('#playermain ul > li').attr('id', function(i){
            return  (i);
        });
        
        // Upphafsstaða spilunar 
        var playing = pluginOptions.autoPlay;
        if(playing == "true") {
            var autop = "autoplay";
        }
        else {
            var autop = "";
        }
        
        // Upphafsnúmer lags        
        var current_song = 0;
        
        // Náð í id spilandi lags
        var hl = "#" + current_song;
        console.log(hl);
        var hlf = $(hl);
        
        // Lagalisti búinn til
        var songlist = $li.toArray();
        
        // Spilari búinn til og sendur
        var player = $("<audio " + autop + " controls='controls' id='spilari'>");
        $(player).append("<source src='" + songlist[current_song].textContent + "' />");
        /////////////////----    Gamla ----//////////////
        // for(var i=0; i<songlist.length; i++){
            // $(player).append("<source id='lag" + i + "' src='" + songlist[i].textContent + "' />");
            
            // hlf.css({'background-color':'yellow'});
        // }
        /////////////////////////////////////////////////
        player.append("</audio>");
        $(this).append(player);
        
        // Spilarinn geymdur í breytu
        var spilarinn = document.getElementById('spilari');    
        
        // Divum bætt við í spilarabreytu
        $(this).append(  
            '<div id="oval">'                                   +
            '<div id="mpPlay" class="button"></div>'            +
            '<div id="mpList" class="button"></div>'            +
            '<div id="mpNext" class="button"></div>'            +
            '<div id="mpPrev" class="button"></div>'            +
            '<div id="mpVolUp" class="button"></div>'           +
            '<div id="mpVolDn" class="button"></div>'           +
            '<div id="mpCurrLen" class="button"></div>'         +
            '<div id="mpCurrPos" class="button"></div>'         +
            '</div>'                                            +
            '<div id="list"><div id="listbottom"></div></div>'
        );
        
        // Klikkað á lag í lagalista
        $('#playermain ul li').click(function() {
            spilarinn.pause();
            current_song = parseInt($(this).attr('id'));
            $(player).html("<source src='" + songlist[current_song].textContent + "' />");
            spilarinn.play();     
        });

        // Play-Pause takka virkni
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
        
        // Show-Hide lagalista
        $("#mpList").click(function(){
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
            $(player).html("<source src='" + songlist[current_song].textContent + "' />");
            spilarinn.play();
        });
        
        // Previous virkni
        $("#mpPrev").click( function() {
            spilarinn.pause();
            if(current_song != 0) {
                current_song--;
            }
            $(player).html("<source src='" + songlist[current_song].textContent + "' />");
            spilarinn.play();
        });
        
        // Tekur inn slóð og skilar heiti lags
        function heitilags(s) {
            
        }
        
        // Tekur inn tímalengt í sekúndum og skilar strengi á forminu "m:ss"
        function lagaTima(timi){
            min = Math.floor(timi / 60);
            sek = Math.floor(timi % 60);
            if(sek < 10) {
                sek = "0" + sek;            
            }
            return min + ":" + sek;
        };
        
        spilarinn.addEventListener("ended", function() {
            if(current_song < songlist.length-1) {
                current_song++;
                $(player).html("<source src='" + songlist[current_song].textContent + "' />");
                spilarinn.play();
            }
        });
        
        // Uppfærir lifandi div í spilara
        function updatePlayerStatus(stada, len) {            
            $('#mpCurrPos').html(lagaTima(stada));
            $('#mpCurrLen').html(lagaTima(len));
        };
        
        // Uppfærir stöðu lifandi breyta
        var refresh = setInterval( function(){
                stada_lags = spilarinn.currentTime;
                lengd_lags = spilarinn.duration;
                updatePlayerStatus(stada_lags, lengd_lags);                   
            }, 1000);
            
      });
   };

})(jQuery);