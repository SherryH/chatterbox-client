// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/messages',

  init: () => {
    $(document).ready(() => {
      var that = this;
      // setInterval(() => {
      //   that.fetch('');
      // },6000);
      app.fetch();
      $('#main').find('.username').click(app.handleUsernameClick);
      $('#send .submit').on('click', () => {
        app.handleSubmit();
      });
      $('#roomSelect').change(()=>{
        var $that = $(this);
        //console.log($('option:selected').text());
        app.fetch($('option:selected').val());
      });

      // $('#send .submit').submit(app.handleSubmit);
    });
  },
  send: message => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: data => {
        console.log('chatterbox: Message sent');
      },
      error: data => {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: (selectedRoomname = '') => {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'json',

      success: data => {
        console.log('chatterbox: received');
        _.each(data.results, item => {
          // app.renderMessage(item);
          console.log('selectedRoomname:', selectedRoomname);
          app.filterMessageByRoom(selectedRoomname, item);
          app.renderRoom(item);
        });
      },
      error: data => {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to load message', data);
      }
    });

  },

  clearMessages: () => {
    $('#chats').empty();
  },

  renderMessage: message => {
    var $userMsg = $('<div/>').addClass('chat').append($('<div class="username"/>').text(message.username)).append ($('<div class="msg"/>').text(message.text));
    // $('#chats').append($user);

    $('#chats').append( $userMsg );
  },

  renderRoom: message => {
    var $roomName = $('<option/>').attr('value', message.roomname).text(message.roomname);
    $('#roomSelect').append($roomName);
  },

  filterMessageByRoom: (roomname, message) =>{
    //only render room when the roomname is the selected room
    //if no room is specified, display all message
    console.log('roomname',roomname);
    if (message.roomname === roomname) {
      console.log('before rendering');
      app.renderMessage(message);
    } else if (roomname === '') {
      console.log('display all room');
      app.renderMessage(message);
    }

  },

  handleUsernameClick: () => {

  },

  handleSubmit: event => {
    // event.preventDefault();
    console.log('My sent');
    var message = {
      username: window.location.search.split('username=')[1],
      text: $('#message').val(),
      roomname: 'HackerAtReactor',

    };
    if (message.text !== '') {
      console.log('My sent2');
      app.send(message);
    }
    // event.preventDefault();
    // $('#send .submit').trigger('submit');
  },
};


