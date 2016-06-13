  function start_it_up(side_a, side_b){
    refreshIntervalId = null;
    position = 0;
    tape = new Object();
    tape.side_a = side_a;
    tape.side_b = side_b;
    $('.decontrols').slideDown();
    audiojs.events.ready(function() {
      ap = audiojs.createAll()[0];
      $('#play').addClass('decontrol-active');
      var audio_player = document.getElementsByTagName('audio')[0];
      audio_player.src = side_a;
      window.setTimeout(function(){
        ap.play();
      }, 1500);
    });
  }

  $('#ff').click(function(){
    clear_skip();
    remove_active_button();
    ap.pause();
    $(this).addClass('decontrol-active');
    refreshIntervalId = window.setInterval(function() {skip_to('ff')}, 100);
  });

  $('#rw').click(function(){
    clear_skip();
    remove_active_button();
    ap.pause();
    $(this).addClass('decontrol-active');
    refreshIntervalId = window.setInterval(function() {skip_to('rew')}, 100);
  });

  $('#play').click(function(){
    clear_skip();
    remove_active_button();
    $(this).addClass('decontrol-active');
    ap.play();
  });
  $('#pause').click(function(){
    clear_skip();
    remove_active_button();
    $(this).addClass('decontrol-active');
    ap.pause();
  });

  $('#flip').click(function(){
    position+=1;
    if(position % 2){
      var audio_player = document.getElementsByTagName('audio')[0];
      audio_player.src = tape.side_b;
    }
    else{
      var audio_player = document.getElementsByTagName('audio')[0];
      audio_player.src = tape.side_a;
    }
    clear_skip();
    remove_active_button();
    $('#play').addClass('decontrol-active');
    ap.play();
  });

  function skip_to(direction){
    duration = .002;
    var audio_tag = document.getElementsByTagName('audio')[0];
    var current = audio_tag.currentTime / audio_tag.duration;
    if(direction == 'ff'){
      var skip_to = current + duration;
    } else {
      var skip_to = current - duration;
    }
    ap.skipTo(skip_to);
  }

  function remove_active_button(){
    ch = $('.decontrols').children().removeClass('decontrol-active');
  }

  function updateTime(){
    activeSong = document.getElementsByTagName('audio')[0];
    var cs = Math.floor(activeSong.currentTime % 60);
    currentSeconds = cs < 10 ? '0' + cs : cs;
    var cm = Math.floor(activeSong.currentTime / 60);
    currentMinutes = cm < 10 ? '0' + cm : cm;
    document.getElementById('current_time').innerHTML = currentMinutes + ":" + currentSeconds;
  }
  function clear_skip(){
    if(refreshIntervalId != null){
      clearInterval(refreshIntervalId);
    }
  }
