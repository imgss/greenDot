jQuery('.dropdown-menu').on('click', 'li', function(event){
    jQuery('#year span:first').html(event.target.textContent)
})