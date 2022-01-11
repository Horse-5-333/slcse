function setBlocks() {
    var windowH = window.innerHeight * 3;
    var secInDay = 86400;

    function setBlock(id, top, height, color) {
        $(id).css("top", (top/secInDay * 300).toString() + "vh");
        $(id).css("height", "calc(" + (height/secInDay * 300).toString() + "vh" + " - 3px)");
        $(id).css("background-color", color + "55");
        $(id).css("border-top", "3px solid " + color + "55");
        $(id).css("color", color);
        document.querySelector(id).style.display = "";
        var time = new Date(null);
        time.setSeconds(top - 32400);
        var start = time.toLocaleTimeString("en-us", { hour: 'numeric', minute: '2-digit' })
        time.setSeconds(time.getSeconds() + height);
        var end = time.toLocaleTimeString("en-us", { hour: 'numeric', minute: '2-digit' })
        document.querySelector(id).textContent = start + " - " + end;
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

    for(let i = 1; i <= 3; i++) {
        day = addDays(new Date(), i-1)
        var dayType = getDayType(day.getDay());

        // all day
        if (dayType == 'a'){
            setBlock('#w' + i.toString() + '2',  1800, 2700, "#F94144");
            setBlock('#w' + i.toString() + '3',  4740, 2700, "#F8961E");
            setBlock('#w' + i.toString() + '4',  7680, 2700, "#F9AF37");
            setBlock('#w' + i.toString() + '5', 10620, 2700, "#E2BC65");
            setBlock('#w' + i.toString() + '6', 15360, 2700, "#90BE6D");
            setBlock('#w' + i.toString() + '7', 18300, 2700, "#4D908E");
            setBlock('#w' + i.toString() + '8', 21240, 2700, "#577590");
            setBlock('#w' + i.toString() + '9', 24180, 2700, "#AE84E1");
        }
        // block day
        else if (dayType == 'b') {
            setBlock('#w' + i.toString() + '2',  1800, 5640, "#F94144");
                   $('#w' + i.toString() + '3').css("display", "none");
            setBlock('#w' + i.toString() + '4',  7680, 5640, "#F9AF37");
                   $('#w' + i.toString() + '5').css("display", "none");
            setBlock('#w' + i.toString() + '6', 15360, 5640, "#90BE6D");
                   $('#w' + i.toString() + '7').css("display", "none");
            setBlock('#w' + i.toString() + '8', 21240, 5640, "#577590");
                   $('#w' + i.toString() + '9').css("display", "none");
        }
        // short day
        else if (dayType == 's') {
            setBlock('#w' + i.toString() + '2',  1800, 2700, "#F94144");
                   $('#w' + i.toString() + '3').css("display", "none");
            setBlock('#w' + i.toString() + '4',  4740, 2700, "#F9AF37");
                   $('#w' + i.toString() + '5').css("display", "none");
            setBlock('#w' + i.toString() + '9', 7680, 3600, "#AE84E1"); // academy
            setBlock('#w' + i.toString() + '6', 11520, 2700, "#90BE6D");
                   $('#w' + i.toString() + '7').css("display", "none");
            setBlock('#w' + i.toString() + '8', 14460, 2700, "#577590");
        }
        // off day
        else if (dayType == 'o') {
            $('#w' + i.toString() + '2').css("display", "none");
            $('#w' + i.toString() + '3').css("display", "none");
            $('#w' + i.toString() + '4').css("display", "none");
            $('#w' + i.toString() + '5').css("display", "none");
            $('#w' + i.toString() + '6').css("display", "none");
            $('#w' + i.toString() + '7').css("display", "none");
            $('#w' + i.toString() + '8').css("display", "none");
            $('#w' + i.toString() + '9').css("display", "none");
        }
    }
}

// finds the corresponding schedule for the day
function getDayType(date) {
    switch (date) {
        case 0:
            return 'o';
        case 1:
            return 'a';
        case 2:
            return 'b';
        case 3:
            return 'b';
        case 4:
            return 'a';
        case 5:
            return 's';
        case 6:
            return 'o';
        }
}

function getSecondsToday() {
    let d = new Date();
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

function updateDate() {
    // formats both date and time strings
    var now = new Date();
    const formatTime =  {
        hour: 'numeric',
        minute: '2-digit'
    };
    const formatDate = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    // changes elements to match date and time
    time = document.querySelector('#timer');
    date = document.querySelector('#day');
    time.textContent = now.toLocaleTimeString("en-US", formatTime);
    date.textContent = now.toLocaleDateString("en-US", formatDate);



    // gets window height and time 
    var windowH = window.innerHeight * 3;
    var dateHeight = (getSecondsToday()/86400 * windowH); // gets the percent of day passed and applies that to the page height
    
    
    // checks if line collides with a block
    var found = false;
    for (let i = 2; i <= 9; i++) {
        let el = document.querySelector('#w1'+ i.toString());
        if (getOffset(el).top <= dateHeight && getOffset(el).top + getOffset(el).height >= dateHeight) {
            // set color
            var rgba = window.getComputedStyle(el, null).getPropertyValue('border-top-color');
            var re = /[0-9]*, [0-9]*, [0-9]*/g;
            var color = "rgba(" + rgba.match(re)[0] + ", 0.6)";

            $('#line').css("background-color", color);
            $('#until').css("opacity", "1");
            $('#until').css("color", color);

            var tilBell = new Date(null);
            tilBell.setHours(0)
            tilBell.setSeconds((getOffset(el).top + getOffset(el).height - dateHeight) / windowH * 86400);
            document.querySelector('#until').textContent = "Bell rings in " + tilBell.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'});
            found = true;
        }
    }
    if (!found) {
        $('#line').css("background-color", "#0E111677");
        $('#until').css("opacity", "0");
    }

    // adjust timeline accordingly
    dateHeight = (dateHeight - getOffset(document.querySelector("#until")).height).toString() + "px";
    $("#date").css("top", dateHeight);


    // checks size of two objects
    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
          height: rect.height,
          top: rect.top + window.scrollY
        };
    }
    


    // set weekdays at top of screen
    $('#day1').css("color", "#D1495B");
    document.querySelector('#day2').textContent = new Date(now.getTime() + 24 * 60 * 60 * 1000).toLocaleString('en-us', {  weekday: 'long' });
    document.querySelector('#day3').textContent = new Date(now.getTime() + 48 * 60 * 60 * 1000).toLocaleString('en-us', {  weekday: 'long' });


    setBlocks(getDayType(new Date().getDay()));
}

$(document).ready(function(){
    // sets up inital date and time
    updateDate();

    // scrolls to timeline
    var offTop = $("#date").offset().top;
    $('html, body').animate({ scrollTop: offTop - window.innerHeight / 4}, 300);
    needScroll = false;

    // updates the date every half second
    setInterval( function(){
        updateDate();
    }, 500)
});

window.onresize = updateDate;