var photoCount=6;
jQuery(document).ready(function() {
  
    var num = 0;
    changeImg($("#sImg"),num);
    $("#sImg").click(function () {
        ++num;
        if (num >= photoCount)
            num = 0;
        changeImg(this,num);
    })
 
    $('form').submit(function(){
        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();
        var re=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,12}$/;
        if(!re.test(username)) {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '72px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if(password == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '140px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }

        if ( $('#repwd').val() == '') {
            $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '210px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $('#repwd').focus();
            });
            return false;
        }
        if ($('#repwd').val() != password) {
            alert('Error~'); $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '195px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $('#repwd').focus();
            });
            return false;
        }

        setCookie('userName',username, 2);
        setCookie('userPhoto',$('#sImg').attr('txName'), 2);
        alert('Success');
        window.history.back();
        return false;
    });

    $('.page-container .username, .page-container  .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });

});

function changeImg(obj, num) {
    $(obj).attr('txName',num);
    $(obj).attr('src', "imgs/tx/"+num+".jpg");
}


function setCookie(key, value, t) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + t);
    document.cookie = key + '=' +escape(value) + ';expires=' + oDate.toGMTString();
}

