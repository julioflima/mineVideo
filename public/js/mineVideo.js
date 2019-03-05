const mineNow = document.getElementById('mineNow');
const somethingToRise = document.getElementById('somethingToRise');
const consoleRemote = document.getElementById('console');

if (somethingToRise) {
    somethingToRise.addEventListener("keyup", function (e) {
        e.preventDefault();
        if (e.keyCode == 13 && somethingToRise.value !== "") {
            cloudComputing(somethingToRise.value);
        }
    });
}

if (mineNow) {
    mineNow.addEventListener("click", function (e) {
        cloudComputing(somethingToRise.value);
    });
}

const cloudComputing = function (somethingSearch) {
    alert(somethingSearch);

};

setInterval(function () {
    if (consoleRemote.scrollTop < consoleRemote.scrollHeight) {
        consoleRemote.scrollTop += 1;
    }
}, 10)

