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
        
               
        $(this).after(  '<a id="mpPlay" href="#">Play</a><br/>'     +
                        '<a id="mpPause" href="#">Pause</a><br/>'   +
                        '<a id="mpVolUp" href="#">Vol+</a><br/>'    +
                        '<a id="mpVolDn" href="#">Vol-</a><br/>'
                        // '<div id="mpVolSlider"></div>' 
        );

        
        $("#mpPlay").click( function() { spilarinn.play(); });
        $("#mpPause").click( function() { spilarinn.pause(); });
        $("#mpVolUp").click( function() { spilarinn.volume += 0.1; });
        $("#mpVolDn").click( function() { spilarinn.volume -= 0.1; });
        $("#mpVolSlider").slider({
            value: 60,
            orientation: "horizontal",
            range: "min",
            animate: true
        });
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

      });
   };

})(jQuery);