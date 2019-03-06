const functions = require('firebase-functions');
const admin = require("firebase-admin");
const googleTrends = require('google-trends-api');
const math = require('mathjs')
const serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://minevideo-2ceee.firebaseio.com"
}, "somethingToWatch");

const db = admin.firestore();

exports = module.exports = functions.https.onRequest((req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    let result;
    if (req.query.somethingSearch === undefined) {
        result = req.body;
    } else {
        result = req.query;
    }

    dataInput = {
        'docId': '...',
        'status': 'doing',
        'log': 'something rised',
        content: {
            'searchTerm': result.somethingSearch,
            'prefix': await getPrexifTrends(content.searchTerm),
            'sourceContentOriginal': "...",
            'sourceContentSanitized': "...",
            'sentences': [
                {
                    'text': "...",
                    'keywords': ["..."],
                    'images': ["..."]
                }
            ]
        }
    }

    db.collection('console').add(dataInput, { merge: true }).then((docRef) => {
        docRef.get().then((doc) => {
            if (doc.exists) {
                data = doc.data();
                data.docId = docRef.id
                throw res.send(data);
            } else {
                throw res.send("No such document!");
            }
        }).catch((error) => {
            throw res.send("Error getting document:", error);
        });
        return true;
    }).catch((error) => {
        throw res.send("Error adding document: ", error);
    });
});

async function getPrexifTrends(searchTerm) {
    const prefixes = ['Who is', 'What is', 'The history of']
    let prefixesTrend = []
    let mostTrend;
    prefixes.forEach((elem) => {
        prefixesTrend.push(elem + ' ' + searchTerm);
    });

    return googleTrends.interestOverTime({ keyword: prefixesTrend }).then((results) => {
        let data = JSON.parse(results);
        let values = [];
        data.default.timelineData.forEach((elem) => {
            values.push(elem.value);
        });

        let mostTrends = [];
        math.transpose(values).forEach((elem) => {
            mostTrends.push(math.sum(elem));
        });

        return prefixes[mostTrends.indexOf(math.max(mostTrends))];
    }).catch((err) => {
        console.error('Oh no there was an error', err);
        return prefixes[Math.random() * prefixes.length];
    });
}
