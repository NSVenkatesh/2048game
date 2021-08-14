$(document).ready(function () {
    $(".newgame").click(function () {
        var rand = Math.floor(Math.random() * 16);
        var rand1 = Math.floor(Math.random() * 16);
        var rand2 = Math.floor(Math.random() * 16);
        var rand3 = Math.floor(Math.random() * 16);
        var randomtile = $('.tile div').eq(rand);
        var randomtile1 = $('.tile div').eq(rand1);
        var randomtile2 = $('.tile div').eq(rand2);
        var randomtile3 = $('.tile div').eq(rand3);
        $(".tile div").each(function () {
            $(this).html("").attr("id", "");
        })
        if (randomtile.attr("class") != randomtile1.attr("class")) {
            $(randomtile).html("2").attr('id', 'two');
            $(randomtile1).html("2").attr('id', 'two');
        } else {
            $(randomtile2).html("4").attr('id', 'four');
            $(randomtile3).html("2").attr('id', 'two');
        }
    })
    $(document).keydown(function () {
        var rand = Math.floor(Math.random() * 16);
        var randomtile = $('.tile div').eq(rand);
        var clicked = event.keyCode;
        play();
        if([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
        if(clicked == 38){
            $(randomtile).html("2").attr('id', 'two');
        }
    })
})

function play() {
    var clicked = event.keyCode;
    var i = 10;
    if (clicked == 38) {
        for (j = i + 1; j <= 14; j++) {
            var up = 0;
            for (i = j; i <= 44; i = i + 10) {
                var currentelement = $(".tile_" + i).html();
                var nextelement = $(".tile_" + (i + 10)).html();
                if (currentelement == "") {
                    var up = up + 1;
                    continue;
                // } else if (currentelement != "" && nextelement != "2") {
                //     var position = i - (up * 10);
                //     $(".tile_" + i).html("").attr("id", "");
                //     $(".tile_" + position).html("2").attr("id", "two");
                } else if (!currentelement == "") {
                    // if (!nextelement == "") {
                    //     if (currentelement == nextelement) {
                    //         // $(".tile_"+i).html((currentelement+nextelement).attr("id","four");
                    //         $(".tile_" + (i + 10)).html("").attr("id", "");
                    //     }
                    // }
                    var position = i - (up * 10);
                    $(".tile_" + i).html("").attr("id", "");
                    // $(".tile_" + position).html(parseInt(currentelement) + parseInt(nextelement)).attr("id", "four");
                    $(".tile_" + position).html("2").attr("id", "two");
                }
            }
        }
    }
    if (clicked == 37) {
        console.log("right");
    }
    if (clicked == 39) {
        console.log("right");
    }
    if (clicked == 40) {
        console.log("down");
    }

}

