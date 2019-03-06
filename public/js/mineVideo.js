const mineNow = document.getElementById('mineNow');
const somethingToRise = document.getElementById('somethingToRise');
const consoleRemote = document.getElementById('console');
var about = document.getElementById('fh5co-about');
var contact = document.getElementById('fh5co-contact');

function showAbout() {
    about.style.display = 'block';
    contact.style.display = 'none';
}

function showContact() {
    contact.style.display = 'block';
    about.style.display = 'none';
}

if (somethingToRise) {
    somethingToRise.addEventListener("keyup", function (e) {
        e.preventDefault();
        if (e.keyCode == 13 && somethingToRise.value !== "") {
            cloudComputing(somethingToRise.value);
        }
    });
}

if (mineNow) {
    mineNow.addEventListener("click", function () {
        if (somethingToRise.value !== "") {
            cloudComputing(somethingToRise.value);
        }
    });
}

const cloudComputing = function (somethingSearch) {
    let promiseSearch = getSomethingSearch(somethingSearch);
    promiseSearch.then((result) => {
        consoleRemote.innerHTML = consoleRemote.innerHTML + "<br />" + JSON.stringify(result);
    })
        .catch((error) => {
            consoleRemote.innerHTML = consoleRemote.innerHTML + "<br />" + error;
        });

};

setInterval(function () {
    if (consoleRemote.scrollTop < consoleRemote.scrollHeight) {
        consoleRemote.scrollTop += 1;
    }
}, 10)

async function getSomethingSearch(somethingSearch) {
    let dataReturn;
    let result = await $.ajax({
        url: 'https://us-central1-minevideo-2ceee.cloudfunctions.net/submit',
        dataType: "json",
        method: 'GET',
        crossDomain: true,
        headers: {
            'Accept': 'application/json'
        },

        data: {
            "somethingSearch": somethingSearch
        },

        success: function (data) {
            console.log(JSON.stringify(dataReturn));
            dataReturn = data;
        }
    });

    return dataReturn;

}