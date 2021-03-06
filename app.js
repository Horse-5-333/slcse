var universalDate;

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function setBlocks() {
    var windowH = window.innerHeight * 3;
    var secInDay = 86400;

    function setBlock(id, top, height, color, academy = false) {

        // makes boxes appear and look nice
        $(id).css("top", (top/secInDay * 300).toString() + "vh");
        $(id).css("height", "calc(" + (height/secInDay * 300).toString() + "vh" + " - 3px)");
        $(id).css("background-color", color + "55");
        $(id).css("border-top", "3px solid " + color + "55");
        $(id).css("color", color);
        $(id).css("box-shadow", '0 0 1.5vw -0.8vw' + color);


        document.querySelector(id).style.display = "";
        var time = new Date(null);
        time.setSeconds(top - 32400); // offsets the date to start at 8:30
        var start = time.toLocaleTimeString("en-us", { hour: 'numeric', minute: '2-digit' })
        time.setSeconds(time.getSeconds() + height);
        var end = time.toLocaleTimeString("en-us", { hour: 'numeric', minute: '2-digit' })

        // gets period number and writes the block times and title
        if (academy) {
            document.querySelector(id).textContent = "Academy\n" + start + " - " + end;
        }
        else {
            var re = /[0-9]/g;
            var period = (Number(id.match(re)[1]) - 1).toString();
            document.querySelector(id).textContent = ordinal_suffix_of(Number(period)) + " period\n" + start + " - " + end;
        }
    }



    for(let i = 1; i <= 5; i++) {
        // find offset to first day of week
        var j = universalDate;
        while (j.getDay() != 1) {
            j = addDays(j, -1);
        }

        day = addDays(j, i-1);
        var dayType = getDayType(day);

        // awful code for selecting what type of day it is but here we are
        // all day
        if (dayType == 'a'){
            setBlock('#w' + i.toString() + '2',  1800, 2700, "#F94144");
            setBlock('#w' + i.toString() + '3',  4740, 2700, "#F57044");
            setBlock('#w' + i.toString() + '4',  7680, 2700, "#EDCC43");
            setBlock('#w' + i.toString() + '5', 10620, 2700, "#FAD12E");
            setBlock('#w' + i.toString() + '6', 15360, 2700, "#90BE6D");
            setBlock('#w' + i.toString() + '7', 18300, 2700, "#4D908E");
            setBlock('#w' + i.toString() + '8', 21240, 2700, "#577590");
            setBlock('#w' + i.toString() + '9', 24180, 2700, "#AE84E1");
        }
        // even day
        else if (dayType == 'be') {
            setBlock('#w' + i.toString() + '3',  1800, 5640, "#F57044");
                   $('#w' + i.toString() + '2').css("display", "none");
            setBlock('#w' + i.toString() + '5',  7680, 5640, "#FAD12E");
                   $('#w' + i.toString() + '4').css("display", "none");
            setBlock('#w' + i.toString() + '7', 15360, 5640, "#4D908E");
                   $('#w' + i.toString() + '6').css("display", "none");
            setBlock('#w' + i.toString() + '9', 21240, 5640, "#AE84E1");
                   $('#w' + i.toString() + '8').css("display", "none");
        }
        // odd day
        else if (dayType == 'bo') {
            setBlock('#w' + i.toString() + '2',  1800, 5640, "#F94144");
                   $('#w' + i.toString() + '3').css("display", "none");
            setBlock('#w' + i.toString() + '4',  7680, 5640, "#EDCC43");
                   $('#w' + i.toString() + '5').css("display", "none");
            setBlock('#w' + i.toString() + '6', 15360, 5640, "#90BE6D");
                   $('#w' + i.toString() + '7').css("display", "none");
            setBlock('#w' + i.toString() + '8', 21240, 5640, "#577590");
                   $('#w' + i.toString() + '9').css("display", "none");
        }
        // short even
        else if (dayType == 'se') {
            setBlock('#w' + i.toString() + '3',  1800, 2700, "#F94144");
                   $('#w' + i.toString() + '2').css("display", "none");
            setBlock('#w' + i.toString() + '5',  4740, 2700, "#EDCC43");
                   $('#w' + i.toString() + '4').css("display", "none");
            setBlock('#w' + i.toString() + '6', 7680, 3600, "#0E1116", true); // academy
            setBlock('#w' + i.toString() + '7', 11520, 2700, "#90BE6D");
                   $('#w' + i.toString() + '8').css("display", "none");
            setBlock('#w' + i.toString() + '9', 14460, 2700, "#577590");
        }
        // short odd
        else if (dayType == 'so') {
            setBlock('#w' + i.toString() + '2',  1800, 2700, "#F94144");
                   $('#w' + i.toString() + '3').css("display", "none");
            setBlock('#w' + i.toString() + '4',  4740, 2700, "#EDCC43");
                   $('#w' + i.toString() + '5').css("display", "none");
            setBlock('#w' + i.toString() + '9', 7680, 3600, "#0E1116", true); // academy
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
    switch (date.getDay()) {
        case 0: // sunday
            return 'o';
        case 1: // monday
            return 'a';
        case 2: // tuesday
            return 'bo';
        case 3: // wednesday
            return 'be';
        case 4: // thursday
            return 'a';
        case 5: // friday

            // jan 7 was EVEN
            var knownDate = new Date(universalDate);
            knownDate.setFullYear(2022, 0, 7);
            if ((date - knownDate) / (1000*60*60*24*7) % 2) {
                return 'so';
            }
            return 'se';
        case 6: // saturday
            return 'o';
        }
}

function getSecondsToday() {
    let d = universalDate;
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

function updateDate() {
    universalDate = new Date();

    // formats both date and time strings
    var now = universalDate;
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
        var j = universalDate.getDay();
        let el = document.querySelector('#w' + j.toString() + i.toString());
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
            document.querySelector('#until').textContent = "Bell rings in\n" + tilBell.toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit', second: '2-digit'});
            $('.timeblock').css("filter", "blur(1px)");
            // $('#w' + j.toString() + i.toString()).css("filter", "none");
            // $('#blocks').css('background', '#00000022');
            // $('#blocks' + j.toString()).css("background", "#00000000")
            // $('#blocks' + j.toString()).css("height", "300vh");
            // $('#blocks' + j.toString()).css("margin-top", "-100vh");

            found = true;
        }
    }
    if (!found) {
        $('#line').css("background-color", "#0E111677");
        $('#until').css("opacity", "0");
        $('.timeblock').css("filter", "none");
    }

    // adjust timeline accordingly
    dateHeight = (dateHeight - getOffset(document.querySelector("#until")).height - 3).toString() + "px";
    $("#date").css("top", dateHeight);


    // checks size of two objects
    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
          height: rect.height,
          top: rect.top + window.scrollY
        };
    }
    

    var j = universalDate;
    while (j.getDay() != 1) {
        j = addDays(j, -1);
    }


    // set weekdays at top of screen
    $('#day1').css("font-size", "1.25em");
    document.querySelector('#day1').textContent = j.toLocaleString('en-us', {  weekday: 'long' });
    document.querySelector('#day2').textContent = new Date(j.getTime() + 24 * 60 * 60 * 1000).toLocaleString('en-us', {  weekday: 'long' });
    document.querySelector('#day3').textContent = new Date(j.getTime() + 48 * 60 * 60 * 1000).toLocaleString('en-us', {  weekday: 'long' });
    document.querySelector('#day4').textContent = new Date(j.getTime() + 72 * 60 * 60 * 1000).toLocaleString('en-us', {  weekday: 'long' });
    document.querySelector('#day5').textContent = new Date(j.getTime() + 96 * 60 * 60 * 1000).toLocaleString('en-us', {  weekday: 'long' });


    setBlocks(getDayType(universalDate));
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