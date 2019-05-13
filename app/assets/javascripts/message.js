$(function(){
  function buildMessageHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class = 'message' data-id=${message.id}>
                  <div class='upper-info'>
                    <p class='upper-info__user'>
                      ${message.user_name}
                    </p>
                    <p class='upper-info__date'>
                      ${message.created_at}
                    </p>
                  </div>
                  <div class='meesage__text'>
                    <p class='lower-message__content'>
                      ${content}
                    </p>
                      ${img}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var $this = $(this);
    var formData = new FormData(this);
    var href = window.location.href;
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(messageJSON){
      var html = buildMessageHTML(messageJSON);
      $('.messages').append(html)
      $this.get(0).reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    return false
  });

  $(function(){
    if ($('.message')[0]){
    setInterval(reloadMessages,5000);
    }
  })

  var reloadMessages = function(){
    last_message_id = $('.message').last().data('id');
    var presentHTML = window.location.href
    $.ajax({
      url:  'api/messages',
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json',
    })
    .done(function(messages) {
      if (messages.length){
        insertHTML = "";
        $.each(messages, function(i, message){
          insertHTML = buildMessageHTML(message);
          $('.messages').append(insertHTML)
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
       })
     }
   })
   .fail(function() {
     alert('自動更新に失敗しました');
   })
  }
});
