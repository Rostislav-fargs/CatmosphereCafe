function showBlock(block, button){
    document.getElementById('profile-acc').style.display = 'none';
    document.getElementById('client-bonuses').style.display = 'none';
    document.getElementById('last-orders').style.display = 'none';

    document.getElementById(block).style.display = 'block';
 
    let buttons = document.querySelectorAll('.profile-btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('active-p');
    });

    button.classList.add('active-p');
    
}
function overlayOn(overlay){
    document.getElementById(overlay).style.display = 'block';
}
function overlayOff(overlay){
    document.getElementById(overlay).style.display = 'none';
}
function overlaySwap(first, second){
    document.getElementById(first).style.display = 'none';
    document.getElementById(second).style.display = 'block';
}