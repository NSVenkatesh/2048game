const allBox = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];
const algoritham = [2, 2, 2, 2, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2];
const totalNumbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
const ids = ["two", "four", "eight", "sixteen", "thirtytwo", "sixtyfour", "onetwentyeight", "twofiftysix", "fiveonetwo", "onezerotwofour", "twozerofoureight"];
var emptyBox = [];
var filledBox = [];
var score = [];
const best_score = [];
var gameover = [];
var moves = [];
var id;
var newval;
var rightx, leftx, upy, downy;
$(document).ready(function () {
    for (i = 0; i < 2; i++) {
        randomSelect();
        $('.tile_' + randomtile).html(number).attr('id', id);
    }
    $('.newgame').click(function () {
        $('.tile div').html("").attr('id', "");
        for (i = 0; i < 2; i++) {
            randomSelect();
            $('.tile_' + randomtile).html(number).attr('id', id);
        }
        while (score.length > 0) {
            score.pop();
        }
        $(".cal_score").html("0");
    })
    $(".tryagain").click(function () {
        $('.tile div').html("").attr('id', "");
        for (i = 0; i < 2; i++) {
            randomSelect();
            $('.tile_' + randomtile).html(number).attr('id', id);
        }
        while (score.length > 0) {
            score.pop();
        }
        $(".cal_score").html("0");

        $(".hide").css({
            'display': 'none'
        });
    })

    $(".game_container").css({
        "touch-action": "pan-down"
    });

    $(document).keydown(function (event) {
        upArr(event);
        upCalc(event);
        upArr(event);
        rightArr(event);
        rightCalc(event);
        rightArr(event);
        downArr(event);
        downCalc(event);
        downArr(event);
        leftArr(event);
        leftCalc(event);
        leftArr(event);
        var total = 0;
        for (var i in score) {
            total += score[i];
        }
        $(".cal_score").html(total);
        
        var clicked = event.keyCode;
        if ([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }

        if (clicked == 37 || clicked == 38 || clicked == 39 || clicked == 40) {
            randomSelect();
            $('.tile_' + randomtile).html(number).attr('id', id).addClass("blink");
        }

        moves = [];
        $.each(gameover, function (i, el) {
            if ($.inArray(el, moves) === -1) moves.push(el);
        })
        if (emptyBox.length <= 1 && moves.length == 4 && filledBox.length >= 15) {
            best_score.push(total);
            let y = Math.max(...best_score);
            $(".b_score").html(y);
            $(".hide").fadeIn(1000).css({
                'display': 'block'
            });
        }
    })

})

function mobile() {
    randomSelect();
    $('.tile_' + randomtile).html(number).attr('id', id).addClass("blink");

    var total = 0;
    for (var i in score) {
        total += score[i];
    }
    $(".cal_score").html(total);
    moves = [];
    $.each(gameover, function (i, el) {
        if ($.inArray(el, moves) === -1) moves.push(el);
    })
    if (emptyBox.length <= 1 && moves.length == 4 && filledBox.length >= 15) {
        best_score.push(total);
        let y = Math.max(...best_score);
        $(".b_score").html(y);
        $(".hide").fadeIn(1000).css({
            'display': 'block'
        });
    }
}

function randomSelect() {
    emptyBox = [];
    filledBox = [];
    array();
    rand = Math.floor(Math.random() * (emptyBox.length));
    randomtile = emptyBox[rand];
    numbRan = Math.floor(Math.random() * (algoritham.length));
    number = algoritham[numbRan];
    for (j = 0; j < totalNumbers.length; j++) {
        var check = totalNumbers[j]
        if (number == check) {
            id = ids[j];
            return;
        }
    }
}

function array() {
    $('.tile div').each(function () {
        var val = $(this).html();
        if (val == "") {
            emptyBox.push($(this).data('box'))
        } else {
            filledBox.push($(this).data('box'))
        }
    })
}

function boxColor(currentEle) {
    for (k = 0; k < totalNumbers.length; k++) {
        var check = totalNumbers[k]
        if (currentEle == check) {
            id = ids[k];
        }
    }
}

function upArr(event) {
    var x = "top";
    var a = 0;
    var clicked = event.keyCode;
    if (clicked == 38 || x == upy) {
        for (i = 1; i <= 4; i++) {
            var a = 10;
            var up = 0;
            for (j = a + i; j <= 44; j = j + 10) {
                currentEle = $('.tile_' + j).html();
                if (currentEle == "") {
                    up = up + 1;
                    continue;
                } else {
                    $('.tile_' + j).html('').attr('id', '').removeClass("blink");
                    boxColor(currentEle);
                    $('.tile_' + (j - (up * 10))).html(currentEle).attr('id', id);
                }
            }
        }
    }
}

function upCalc(event) {
    var x = "top";
    var calculated = 0
    var a = 0;
    var clicked = event.keyCode;
    if (clicked == 38 || x == upy) {
        for (i = 1; i <= 4; i++) {
            var a = 10;
            var up = 0;
            for (j = a + i; j <= 44; j = j + 10) {
                currentEle = $('.tile_' + j).html();
                if (currentEle == "") {
                    up = up + 1;
                    continue;
                } else {
                    nextElement = $('.tile_' + (j + 10)).html();
                    if (currentEle == nextElement) {
                        $('.tile_' + j).html('').attr('id', '').removeClass("blink");
                        newval = parseInt(currentEle) + parseInt(nextElement);
                        boxColor(newval);
                        $('.tile_' + j).html(newval).attr('id', id);
                        $('.tile_' + (j + 10)).html('').attr('id', '');
                        score.push(newval);
                        calculated = calculated + 1;
                    }
                    if (j == 44) {
                        if (calculated == 0) {
                            let x = 0;
                            gameover.push(x);
                        } else {
                            gameover = [];
                        }
                    }
                }
            }
        }
    }
}

function rightArr(event) {
    var x = "right";
    var a = 0;
    var clicked = event.keyCode;
    if (clicked == 39 || x == rightx) {
        for (i = 4; i <= 44; i = i + 10) {
            var a = 10;
            var up = 0;
            for (j = a + i; j <= 44; j = j - 1) {
                currentEle = $('.tile_' + j).html();
                if (currentEle == "") {
                    up = up + 1;
                    continue;
                } else if (!currentEle == "") {
                    $('.tile_' + j).html('').attr('id', '').removeClass("blink");
                    boxColor(currentEle);
                    $('.tile_' + (j + up)).html(currentEle).attr('id', id);
                    continue;
                } else {
                    break;
                }
            }
        }
    }
}

function rightCalc(event) {
    var x = "right";
    var calculated = 0;
    var a = 0;
    var clicked = event.keyCode;
    if (clicked == 39 || x == rightx) {
        for (i = 4; i <= 44; i = i + 10) {
            var a = 10;
            var up = 0;
            for (j = a + i; j <= 44; j = j - 1) {
                currentEle = $('.tile_' + j).html();
                if (currentEle == "") {
                    up = up + 1;
                    continue;
                } else if (currentEle == undefined) {
                    break;
                } else {
                    nextElement = $('.tile_' + (j - 1)).html();
                    if (currentEle == nextElement) {
                        $('.tile_' + j).html('').attr('id', '').removeClass("blink");
                        newval = parseInt(currentEle) + parseInt(nextElement);
                        boxColor(newval);
                        $('.tile_' + j).html(newval).attr('id', id);
                        $('.tile_' + (j - 1)).html('').attr('id', '');
                        score.push(newval);
                        calculated = calculated + 1;
                    }
                    if (j == 41) {
                        if (calculated == 0) {
                            let x = 1
                            gameover.push(x);
                        } else {
                            gameover = [];
                        }
                    }
                }
            }
        }
    }
}

function downArr(event) {
    var x = "down";
    var a = 0;
    var clicked = event.keyCode;
    if (clicked == 40 || x == downy) {
        for (i = 1; i <= 4; i = i + 1) {
            var a = 40;
            var up = 0;
            for (j = a + i; j <= 44; j = j - 10) {
                currentEle = $('.tile_' + j).html();
                if (currentEle == "") {
                    up = up + 1;
                    continue;
                } else if (!currentEle == "") {
                    $('.tile_' + j).html('').attr('id', '').removeClass("blink");
                    boxColor(currentEle);
                    $('.tile_' + (j + (up * 10))).html(currentEle).attr('id', id);
                    continue;
                } else {
                    break;
                }
            }
        }
    }
}

function downCalc(event) {
    var x = "down";
    var calculated = 0;
    var a = 0;
    var clicked = event.keyCode;
    if (clicked == 40 || x == downy) {
        for (i = 1; i <= 4; i = i + 1) {
            var a = 40;
            var up = 0;
            for (j = a + i; j <= 44; j = j - 10) {
                currentEle = $('.tile_' + j).html();
                if (currentEle == "") {
                    up = up + 1;
                    continue;
                } else if (currentEle == undefined) {
                    break;
                } else {
                    nextElement = $('.tile_' + (j - 10)).html();
                    if (currentEle == nextElement) {
                        $('.tile_' + j - 10).html('').attr('id', '').removeClass("blink");
                        newval = parseInt(currentEle) + parseInt(nextElement);
                        boxColor(newval);
                        $('.tile_' + j).html(newval).attr('id', id);
                        $('.tile_' + (j - 10)).html('').attr('id', '');
                        score.push(newval);
                        calculated = calculated + 1;
                    }
                    if (j == 14) {
                        if (calculated == 0) {
                            let x = 2
                            gameover.push(x)
                        } else {
                            gameover = []
                        }
                    }
                }
            }
        }
    }
}

function leftArr(event) {
    var x = "left";
    var a = 0;
    var clicked = event.keyCode;
    if (clicked == 37 || x == leftx) {
        for (i = 1; i <= 44; i = i + 10) {
            var a = 10;
            var up = 0;
            for (j = a + i; j <= 44; j = j + 1) {
                currentEle = $('.tile_' + j).html();
                if (currentEle == "") {
                    up = up + 1;
                    continue;
                } else if (!currentEle == "") {
                    $('.tile_' + j).html('').attr('id', '').removeClass("blink");
                    boxColor(currentEle);
                    $('.tile_' + (j - up)).html(currentEle).attr('id', id);
                    continue;
                } else {
                    break;
                }
            }
        }
    }
}

function leftCalc(event) {
    var x = "left";
    var calculated = 0;
    var a = 0;
    var clicked = event.keyCode;
    if (clicked == 37 || x == leftx) {
        for (i = 1; i <= 44; i = i + 10) {
            var a = 10;
            var up = 0;
            for (j = a + i; j <= 44; j = j + 1) {
                currentEle = $('.tile_' + j).html();
                if (currentEle == "") {
                    up = up + 1;
                    continue;
                } else if (currentEle == undefined) {
                    break;
                } else {
                    nextElement = $('.tile_' + (j + 1)).html();
                    if (currentEle == nextElement) {
                        $('.tile_' + j).html('').attr('id', '').removeClass("blink");
                        newval = parseInt(currentEle) + parseInt(nextElement);
                        boxColor(newval);
                        $('.tile_' + j).html(newval).attr('id', id);
                        $('.tile_' + (j + 1)).html('').attr('id', '');
                        score.push(newval);
                        calculated = calculated + 1;
                    }
                    if (j == 44) {
                        if (calculated == 0) {
                            let x = 3
                            gameover.push(x);
                        } else {
                            gameover = []
                        }
                    }
                }
            }
        }
    }
}


let pageWidth = window.innerWidth || document.body.clientWidth;
let treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
const gestureZone = document.getElementById('game_container');

gestureZone.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
}, false);

function handleGesture(event) {
    let x = touchendX - touchstartX;
    let y = touchendY - touchstartY;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (yx <= limit) {
            if (x < 0) {
                leftx = "left"
                leftArr(event);
                leftCalc(event)
                leftArr(event);
                mobile();

            } else {
                rightx = "right"
                rightArr(event);
                rightCalc(event);
                rightArr(event);
                mobile();
            }
        }
        if (xy <= limit) {
            if (y < 0) {
                upy = "top"
                upArr(event);
                upCalc(event);
                upArr(event);
                mobile();
            } else {
                downy = "down"
                downArr(event);
                downCalc(event);
                downArr(event);
                mobile();
            }
        }
    }
}