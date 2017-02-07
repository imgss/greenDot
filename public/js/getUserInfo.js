function getUserInfo(username, selector) { //填充信息
    console.log(username);
    selector = selector || '#userinfo';
    jQuery.ajax({
        'url': 'https://api.github.com/users/' + username,
        'dataType': 'jsonp',
        'success': function(dat) {
            var str = '';
            str += `<ul style="border:#aaa 1px solid;list-style-type:none; border-left:#f66 3px solid">
                  <li><img src='${dat.data.avatar_url}' width='50px' style:'display:inline-block; border-radius:50%'></li>
                  <li><small>个性签名:${dat.data.bio||'暂无'}</small></li>
                  <li><small>加入时间:${dat.data.created_at.substring(0,10) }</small></li>`
            str += '</ul>';
            jQuery(selector).html(str);
        }
    });
};