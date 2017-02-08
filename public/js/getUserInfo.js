function getUserInfo(username, selector) { //填充信息
    console.log(username);
    selector = selector || '#userinfo';
    jQuery.ajax({
        'url': 'https://api.github.com/users/' + username,
        'dataType': 'jsonp',
        'success': function(dat) {
            var str = '';
            str += `<ul">
                  <li><img src='${dat.data.avatar_url}' width='50px' style:'display:inline-block; border-radius:50%'>
                  <span style='font-size:2em;font-weight:bold'>${dat.data.name}</span></li>
                  <li><small>个性签名:${dat.data.bio||'暂无'}</small></li>
                  <li>加入时间:${dat.data.created_at.substring(0,10) }</li>
                  <li>fllowers:${dat.data.followers}</li>
                  <li>github主页:<a href='${dat.data.html_url}'>${dat.data.html_url}</a></li>`
            str += '</ul>';
            jQuery(selector).html(str);
        }
    });
};