window.addEventListener("load", function () {

    fieldService.generate();

    var level = 1;

    var count = 0;

    var zombieGenerationTick = 2000;


    var start = function () {

        if(buttonService.isOnPause() == true) {//if zombie is not generating

            buttonService.onPause();

            document.getElementById("zombieField").classList.remove("gameOver");

            document.getElementById("zombieField").classList.remove("victory");


            timerGeneratingId = setTimeout(function tick() {

                zombieService.createZombie();

                count++;

                timerGeneratingId = setTimeout(tick, zombieGenerationTick);

                if(count == zombieService.numZombiePerLevel) {

                    clearTimeout(timerGeneratingId);
                }

            }, zombieGenerationTick);
        }
        else {

            buttonService.onStart();

            clearTimeout(timerGeneratingId);
        }
    };

    var startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", start);


    zombieService.on("gameOver", function () {

        resetGame("gameOver");

        buttonService.onStart("Try again");
    });

    zombieService.on("victory", function () {

        resetGame("victory");

        zombieService.numZombiePerLevel += 15;

        zombieGenerationTick *= 0.7;

        level++;


        buttonService.onStart("Level " + level);
    });

    function resetGame(styleClassName) {

        clearTimeout(zombieService.timerMovingId);

        clearTimeout(timerGeneratingId);

        count = 0;

        zombieService.clearAll();

        heroService.clearAll();


        var zombieFieldEl = document.getElementById("zombieField");

        while(zombieFieldEl.firstChild) zombieFieldEl.removeChild(zombieFieldEl.firstChild);

        zombieFieldEl.classList.add(styleClassName);


        startBtn.addEventListener("click", fieldService.generate);
    }
});