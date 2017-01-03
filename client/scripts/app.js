// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/',

  init: function() {
    $(document).ready(function() {
      $('#main').find('.username').click(app.handleUsernameClick);
      $('#send .submit').submit(app.handleSubmit);
    });
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server + '/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    var $userMsg = $('<div/>').append($('<div class="username"/>').text(message.username)).append ($('<div class="msg"/>').text(message.text));
    // $('#chats').append($user);

    $('#chats').append( $userMsg );
  },

  renderRoom: function(roomName) {
    $('#roomSelect').append('<option value="' + roomName + '">' + roomName + '</option>');
  },

  handleUsernameClick: function() {

  },

  handleSubmit: function() {
    // console.log('at handleSubmit');
    // $('#send .submit').trigger('submit');
  },
};


