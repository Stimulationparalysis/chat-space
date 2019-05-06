$(function(){
  function buildMessageHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class='message'>
                  <div class='upper-info'>
                    <p class='upper-info__user'>
                      ${message.user_name}
                    </p>
                    <p class='upper-info__date'>
                      ${message.date}
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
    .done(function(jbuilderData){
      var html = buildMessageHTML(jbuilderData);
      $('.messages').append(html)
      $this.get(0).reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    });
    return false
  });
});