'use strict';
$(document).ready(async function() {
  localStorage.setItem(
    'order_data',
    JSON.stringify({
      order_id: '42',
      order_code: 'OKV202106070001',
      queue_id: '1',
      queue_service_id: '2',
      queue_list_id: '7',
      doctor_id: '5',
      patient_id_parent: '8',
      patient_id: '8',
      patient_name: 'Adit Member',
      patient_age: '0',
      patient_birth_date: '2021-06-07',
      patient_gender: 'male',
      order_number: '1',
      skipped: '1',
      complaint: 'okevcall test',
      status: 'paid',
      order_date: '2021-06-07T07:02:26.227Z',
      service_name: 'okevcall',
      order_service_id: '42',
      service_id: '2',
      address: '----------',
      address_note: '-',
      location: 'null',
      start_at: 'null',
      end_at: 'null',
      token_midtrans: 'null',
      user_name: 'Adit Member',
      patient_phone: '081298249207',
      doctor_name: 'Dr raditsan ',
      doctor_type: 'umum',
      admin_fee: '10000',
      share_fee: '2000',
      service_fee: '8000',
      appointment_date: '2021-06-07T14:02:25.000Z',
      medical_record: 'false',
      medical_record_url:
        'https://stage-api.okedok.co.id/v2/order/42/medicalrecords',
      api_base_url: 'https://stage-api.okedok.co.id/v2/',
      api_key_field: 'apiKey',
      api_key: 'C2kmG6LOUZyJF6ZK3EitJMA5EKFlNJQI',
      api_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRHIgcmFkaXRzYW4gIiwiZG9jdG9yX2lkIjo1LCJwaWN0dXJlX3VybCI6Im51bGwiLCJlbWFpbCI6InJhZGl0c2FkaXR5YTJAZ21haWwuY29tIiwicGhvbmUiOiIwODEyOTgyNDkyMDciLCJzdGF0dXMiOiJhY3RpdmUiLCJ0eXBlIjoiZG9jdG9yIiwiZmNtX3Rva2VuIjoiY0VOZFRDVE5HMEZBZ1MtdEUya0N4VTpBUEE5MWJFX2VSQVhCZ2otTFBhdjFJOVlIVnZtMHJpeGs2V3F5NGJLR1FvQmpXZHIwdlZSQjNWVW41M28xNGdic2YzMDd1bldBRVVqS2F1dUFKamNpNVVQV1JFQVpKWnhhZGQwT0JvZTd0aENmNTRkT3BCdVFqZTB6bE5TalctUUNTNS13NVQzZjJNRSIsImRldmljZSI6IndlYiIsImRldmljZV9pbmZvIjoiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTAuMTU7IHJ2Ojg5LjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvODkuMCIsImRvY3Rvcl90eXBlIjoidW11bSIsInJlZ2lzdHJhdGlvbl9udW1iZXIiOiI4MjUwNjIiLCJyZWdpc3RyYXRpb25fY29kZSI6IlJFRzIwMjEwNjA0OTIwNyIsInJlZ2lzdHJhdGlvbl9pbnRlcnZpZXdfZGF0ZSI6IjIwMjEtMDYtMDdUMDY6NDA6NDUuNDQzWiIsInJlZ2lzdHJhdGlvbl9zdGF0dXMiOiJhY2NlcHRlZCIsInJlZ2lzdHJhdGlvbl9leHBpcmUiOiIyMDIxLTA2LTExVDA2OjQwOjQ1LjQ0M1oiLCJpYXQiOjE2MjMwNDY0MDV9.YMKPIivHPsUQ2_eYCa9-xO0cnYVVXFw9L_c64XOV944',
      apzKey: '784f886e00021c60cad7e263f2177416'
    })
  );
  // apiRTC.setLogLevel(10);
  setStatus('calling...');
  var localStreamReady = false;
  var remoteStreamReady = false;
  var action = '';
  // var callIdOkeDok = (await localStorage.getItem("callIdOkeDok")) || "303";
  var data = null;
  var opponentId = null;
  var connectedSession = null;
  var currentCall = null;

  function setName(value) {
    $('.call-name').each(function() {
      $(this).html(value);
    });
  }

  function setQuestion(value) {
    $('.call-question').each(function() {
      $(this).html(value);
    });
  }

  async function getData() {
    const order = JSON.parse(localStorage.getItem('order_data'));
    data = order;
    // opponentId = "member" + order.user_id + order.order_code;
    opponentId =
      'partner' +
      (data.doctor_id || data.partner_id) +
      data.order_id +
      data.order_code;
    setName(data.doctor_name || data.partner_name);
    setQuestion(data.complaint);
    registerApiRtc({
      id: 'member' + data.patient_id_parent + data.order_id + data.order_code,
      cloudUrl: 'https://cloud.apizee.com'
    });
  }

  //Function to add media stream in Div
  function addStreamInDiv(stream, divId, mediaEltId, style, muted) {
    var streamIsVideo = stream.hasVideo();

    var mediaElt = null,
      divElement = null,
      funcFixIoS = null,
      promise = null;

    if (streamIsVideo === 'false') {
      mediaElt = document.createElement('audio');
    } else {
      mediaElt = document.createElement('video');
    }

    mediaElt.id = mediaEltId;
    mediaElt.autoplay = true;
    mediaElt.muted = muted;
    mediaElt.style.width = style.width;
    mediaElt.style.height = style.height;

    funcFixIoS = function() {
      var promise = mediaElt.play();

      console.log('funcFixIoS');
      if (promise !== undefined) {
        promise
          .then(function() {
            // Autoplay started!
            console.log('Autoplay started');
            console.error('Audio is now activated');
            document.removeEventListener('touchstart', funcFixIoS);

            // $('#status')
            //   .empty()
            //   .append('iOS / Safari : Audio is now activated');
          })
          .catch(function(error) {
            // Autoplay was prevented.
            console.error('Autoplay was prevented');
          });
      }
    };

    stream.attachToElement(mediaElt);

    divElement = document.getElementById(divId);
    divElement.appendChild(mediaElt);
    promise = mediaElt.play();

    if (promise !== undefined) {
      promise
        .then(function() {
          // Autoplay started!
          console.log('Autoplay started');
        })
        .catch(function(error) {
          // Autoplay was prevented.
          if (apiRTC.osName === 'iOS') {
            console.info(
              'iOS : Autoplay was prevented, activating touch event to start media play'
            );
            //Show a UI element to let the user manually start playback

            //In our sample, we display a modal to inform user and use touchstart event to launch "play()"
            document.addEventListener('touchstart', funcFixIoS);
            console.error(
              'WARNING : Audio autoplay was prevented by iOS, touch screen to activate audio'
            );
            // $('#status')
            //   .empty()
            //   .append(
            //     'WARNING : iOS / Safari : Audio autoplay was prevented by iOS, touch screen to activate audio'
            //   );
          } else {
            console.error('Autoplay was prevented');
          }
        });
    }
  }

  function setCountdown() {
    if (localStreamReady && remoteStreamReady) {
      console.log('stop retry setCountdown');
      var timeStr = secondsToTime(data.rangeTime);
      var timer2 = timeStr['m'] + ':' + timeStr['s'];
      var interval = setInterval(function() {
        var timer = timer2.split(':');
        //by parsing integer, I avoid all extra string processing
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = seconds < 0 ? --minutes : minutes;
        if (minutes < 0) {
          clearInterval(interval);
          onEndCall('timesup');
          return;
        }
        seconds = seconds < 0 ? 59 : seconds;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        //minutes = (minutes < 10) ?  minutes : minutes;
        $('#countdown').html(
          (minutes < 10 ? '0' + minutes : minutes) + ':' + seconds
        );
        timer2 = minutes + ':' + seconds;
      }, 1000);
    } else {
      console.log('retry setCountdown');
      setTimeout(function() {
        setCountdown();
      }, 500);
    }
  }

  function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  function onAccept() {
    $('#call-countdown').removeClass('hide');
    $('#call-user-info').addClass('hide');
    $('#local-stream').addClass('connected');
    $('#remote-stream').addClass('connected');
    $('#call-connecting').addClass('hide');
    $('#call-connected').removeClass('hide');
    $('#call-cancel').addClass('hide');
  }
  function onReject() {
    $('#call-cancel').addClass('hide');
    $('#call-countdown').addClass('hide');
    $('#call-user-info').removeClass('hide');
    $('#local-stream').removeClass('connected');
    $('#remote-stream').removeClass('connected');
    $('#call-connecting').removeClass('hide');
    $('#call-connected').addClass('hide');
    $('#call-status').html('waiting...');
    $('#call-connecting').addClass('hide');
  }

  function setStatus(status) {
    $('#call-status').html(status);
  }

  function onEndCall(type = 'onEndCall') {
    console.log('onEndCall');
    action = type;
    if (type === 'timesup_waiting') {
      sendMessageToNative({
        process: type
      });
    } else if (currentCall) {
      currentCall.hangUp();
      currentCall = null;
      sendMessageToNative({
        process: type
      });
    } else {
      onReject();
    }
  }

  function getDataFix() {
    return {
      ...data,
      api_base_url: undefined,
      api_token: undefined,
      api_key: undefined,
      api_key_field: undefined,
      apzKey: undefined,
      medical_record_url: undefined
    };
  }

  function getHeaders() {
    return {
      Accept: 'application/json, text/plain, */*',
      [data.api_key_field]: data.api_key,
      Authorization: data.api_token
    };
  }

  async function getOrdersData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url:
          data.api_base_url +
          'order/' +
          data.order_id +
          '/data/' +
          data.service_name +
          '?code=' +
          data.order_code +
          '&detail=false',
        method: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        timeout: 0,
        headers: getHeaders()
      })
        .done(function(value) {
          resolve(value);
        })
        .fail(function(e) {
          reject(e);
        });
    });
  }

  function calculateRangeTimes(started_at, ammount) {
    try {
      const sa = started_at;
      let start_at;
      if (sa && sa !== 'null' && sa !== '') {
        const s = moment(sa);
        if (s.isValid()) {
          s.add(ammount, 'minutes');
          start_at = s.diff(moment(), 'seconds');
        } else {
          start_at = 0;
        }
        return parseFloat(start_at < 0 ? 0 : start_at);
      }
    } catch (e) {
      console.error('onProsesVcall', e);
      return 0;
    }
  }

  async function getDetailAndCall() {
    try {
      let orderData;
      const params = data;
      if (params.start_at === 'null') {
        const { data: dataO } = await getOrdersData();
        console.log('dataO', dataO);
        orderData = dataO;
      } else {
        orderData = params;
      }
      const rangeTime = calculateRangeTimes(orderData.start_at, 30);
      console.log('rangeTime', rangeTime);
      data = { ...params, ...orderData, rangeTime };

      if (rangeTime === 0) {
        sendMessageToNative({ process: 'timesup' });
        return;
      } else {
        setCountdown();
      }
    } catch (e) {
      console.error('getDetailAndCall', e);
    }
  }

  function setCallListeners() {
    currentCall
      .on('localStreamAvailable', function(stream) {
        console.log('localStreamAvailable');
        //document.getElementById('local-media').remove();
        addStreamInDiv(
          stream,
          'local-stream',
          'local-media-' + stream.getId(),
          {
            height: '100%',
            width: '100%'
          },
          true
        );
        localStreamReady = true;
        stream.on('stopped', function(element) {
          //When client receives an screenSharing call from another user
          console.error('Stream stopped', element);
          $('#local-media-' + stream.getId()).remove();
        });
      })
      .on('streamAdded', function(stream) {
        console.log('stream :', stream);
        addStreamInDiv(
          stream,
          'remote-stream',
          'remote-media-' + stream.getId(),
          {
            height: '100%',
            width: '100%'
          },
          false
        );
        remoteStreamReady = true;
        setTimeout(function() {
          getDetailAndCall();
        }, 100);
      })
      .on('streamRemoved', function(stream) {
        // Remove media element
        console.error('Stream Removed');
        $('#remote-media-' + stream.getId()).remove();
      })
      .on('userMediaError', function(e) {
        console.log('userMediaError detected : ', JSON.stringify(e));
        console.log(
          'userMediaError detected with error : ',
          JSON.stringify(e.error)
        );

        //Checking if tryAudioCallActivated
        if (e.tryAudioCallActivated === false) {
          // $('#hangup-' + call.getId()).remove();
        }
      })
      .on('desktopCapture', function(e) {
        console.log('desktopCapture event : ', e);
        // $('#hangup-' + call.getId()).remove();
      })
      .on('hangup', function() {
        // incomingCall = null;
        if (action !== 'endcall') {
          onEndCall('hangup');
        }
      });
    onAccept();
  }

  function registerApiRtc(registerInformation) {
    var ua = new apiRTC.UserAgent({
      uri: 'apzkey:' + data.apzKey
      // uri: "apzkey:myDemoApiKey"
    });
    ua.register(registerInformation)
      .then(function(session) {
        const listContacts = session.getOnlineContactsArray('default') || [];
        const { userData } =
          listContacts.find(item => item?.userData?.id === opponentId) || {};
        console.log('listContacts', listContacts);
        console.log('userData', userData);
        if (!userData) {
          updateDBPatient('doctor_notfound');
          sendMessageToNative({
            process: 'doctor_notfound'
          });
        } else {
          connectedSession = session;
          // setStatus('ringing');
          onStartCall();
        }
      })
      .catch(function(error) {
        sendMessageToNative({
          process: 'failed_register_server'
        });
        console.error('User agent registration failed', error);
      });
  }

  function onStartCall() {
    setStatus('connecting');
    const contact = connectedSession.getOrCreateContact(opponentId);
    const call = contact.call();
    if (!call) {
      console.warn('Cannot establish the call');
      sendMessageToNative({ process: 'cannot_establish_the_call' });
      return;
    }
    currentCall = call;
    setCallListeners();
  }

  function sendMessageToNative(objData) {
    var messageObj = objData;
    var stringifiedMessageObj = JSON.stringify({
      ...messageObj,
      callData: data
    });
    try {
      webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);
    } catch (e) {
      console.error(e);
    }
  }

  $('#onEndCall').click(function() {
    $('#end-call-confirm-modal').modal();
  });

  $('#do-endcall-button').click(function() {
    console.log('do-endcall-button');
    onEndCall('endcall');
  });

  $('#onCancelCall').click(function() {
    sendMessageToNative({
      process: 'cancel'
    });
  });

  window.ambilData = function() {
    getData();
  };
});
