const base = require("./base.js");
const columns = require("../columns.js");

var columnsTransformed = {};

columnsTransformed.mentee = Object.assign(
    JSON.parse(JSON.stringify(columns.general)),
    JSON.parse(JSON.stringify(columns.mentee))
);
columnsTransformed.mentor = Object.assign(
    JSON.parse(JSON.stringify(columns.general)),
    JSON.parse(JSON.stringify(columns.mentor))
);

var generateRules = {
    mentee: {
        consent: {
            val: "Oui",
        },
        surname: {
            inBase: true,
        },
        firstName: {
            inBase: true,
        },
        email: {
            inBase: true,
        },
        seniority: { in: [
                "Moins d'1 ans",
                "De 1 à 3 ans",
                "De 4 à 10 ans",
                "De 11 à 20 ans",
                "Plus de 20 ans",
            ],
        },
        age: {
            num: { from: 23, to: 57 },
        },

        branch: { in: ["DG", "EP", "GRP", "MS", "RC", "TGS", "TS"] },
        direction: {
            previous: {
                from: "branch",
                label: "/PSR/POL/",
                num: {
                    from: 1,
                    to: 3,
                },
            },
        },
        jobTitle: {
            val: "Valeur titre de poste",
        },
        jobDescription: {
            val: "Valeur description de poste",
        },
        executive: { in: ["Cadre", "Non cadre"] },
        jobGrade: {
            num: { from: 9, to: 16 },
        },
        zone: {
            val: "Europe du Nord",
        },
        country: {
            val: "France",
        },
        region: { in: [
                "Région Bretagne",
                "Région parisienne",
                "Région PACA",
                "Région Grand Sud-Ouest",
            ],
        },
        city: {
            previous: {
                from: "region",
                label: " Ville ",
                num: {
                    from: 1,
                    to: 3,
                },
            },
        },
        site: {
            val: "Valeur intitulé du site",
        },
        careerPath: {
            val: "Valeur parcours pro",
        },
        careerGoal: {
            val: "Valeur objectif professionnel",
        },
        reasonsParticipation: {
            val: "Valeur raisons participation",
        },
        expectations: {
            val: "Valeur attentes",
        },
        alreadyParticipated: { in: ["Oui", "Non"] },
        participationYear: {
            num: { from: 2010, to: 2019 },
        },
        mentorGender: { in: ["Femme", "Homme", "Indifférent"] },
        mentorLocation: { in: ["En local", "A l'international", "Indifférent"] },
        mentorPreference: {
            val: "Description préférence mentor",
        },
        frenchMentoring: { in: ["Oui", "Non"] },
        englishMentoring: { in: ["Oui", "Non"] },
        thematics: {
            ins: [
                ["", "Développement personnel"],
                ["", "Culture Groupe"],
                ["", "Equilibre vie professionnelle/vie personnelle"],
                ["", "Parcours professionnel / Réseau et influence"],
                ["", "Management et relation hiérarchique"],
                ["", "Mixité"],
            ],
        },
    },
    mentor: {
        consent: { val: "Oui" },
        surname: {
            inBase: true,
        },
        firstName: {
            inBase: true,
        },
        email: {
            inBase: true,
        },
        seniority: { in: [
                "Moins d'1 ans",
                "De 1 à 3 ans",
                "De 4 à 10 ans",
                "De 11 à 20 ans",
                "Plus de 20 ans",
            ],
        },
        age: {
            num: { from: 25, to: 58 },
        },
        gender: {
            inBase: true,
        },

        branch: { in: ["DG", "EP", "GRP", "MS", "RC", "TGS", "TS"] },

        direction: {
            previous: {
                from: "branch",
                label: "/PSR/POL/",
                num: {
                    from: 1,
                    to: 3,
                },
            },
        },

        jobTitle: {
            val: "Valeur titre de poste",
        },
        jobDescription: {
            val: "Valeur description de poste",
        },
        jobGrade: {
            num: { from: 14, to: 20 },
        },
        zone: {
            val: "Europe du Nord",
        },
        country: {
            val: "France",
        },
        region: { in: [
                "Région Bretagne",
                "Région parisienne",
                "Région PACA",
                "Région Grand Sud-Ouest",
            ],
        },
        city: {
            previous: {
                from: "region",
                label: " Ville ",
                num: {
                    from: 1,
                    to: 6,
                },
            },
        },
        site: {
            val: "Valeur intitulé du site",
        },
        careerPath: {
            val: "Valeur parcours pro",
        },
        otherExperiences: {
            val: "Valeur autres experiences",
        },
        reasonsParticipation: {
            val: "Valeur raisons participation",
        },
        expectations: {
            val: "Valeur attentes",
        },
        alreadyParticipated: { in: ["Oui", "Non"] },
        participationYear: {
            num: { from: 2010, to: 2019 },
        },
        menteeLocation: { in: ["En local", "A l'international", "Indifférent"] },

        menteeStatus: { in: ["Cadre", "Oetam", "Indifférent"] },
        frenchMentoring: { in: ["Oui", "Non"] },
        englishMentoring: { in: ["Oui", "Non"] },
        thematics: {
            ins: [
                ["", "Développement personnel"],
                ["", "Culture Groupe"],
                ["", "Equilibre vie professionnelle/vie personnelle"],
                ["", "Parcours professionnel / Réseau et influence"],
                ["", "Management et relation hiérarchique"],
                ["", "Mixité"],
            ],
        },
    },
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getNumVal(el) {
    return getRandomInt(el.num.from, el.num.to);
}

function getInVal(el) {
    return el.in[getRandomInt(0, el.in.length - 1)];
}

function getNewValFromPrevious(tag, obj, el) {
    return (
        obj[columnsTransformed[tag][el.previous.from].name] +
        el.previous.label +
        getRandomInt(el.previous.num.from, el.previous.num.to)
    );
}

function generateData(tag, fromVal, toVal) {
    var lines = [];
    for (let i = fromVal; i < toVal; i++) {
        const human = base[i];
        var line = {};
        for (var prop in generateRules[tag]) {
            var rule = generateRules[tag][prop];
            if (rule.inBase) {
                line[columnsTransformed[tag][prop].name] = human[prop];
            } else if (rule.val) {
                line[columnsTransformed[tag][prop].name] = rule.val;
            } else if (rule.num) {
                line[columnsTransformed[tag][prop].name] = getNumVal(rule);
            } else if (rule.in) {
                line[columnsTransformed[tag][prop].name] = getInVal(rule);
            } else if (rule.previous) {
                line[columnsTransformed[tag][prop].name] = getNewValFromPrevious(
                    tag,
                    line,
                    rule
                );
            } else if (rule.ins) {
                var toAssign = {};
                for (let j = 0; j < rule.ins.length; j++) {
                    const _in = rule.ins[j];
                    toAssign[columnsTransformed[tag][prop].names[j]] = getInVal({ in: _in,
                    });
                }
                Object.assign(line, toAssign);
            }
        }
        lines.push(line);
    }
    return lines;
}

function clean(arr) {
    arr.forEach((element) => {
        if (
            element[columns.general.frenchMentoring.name] == "Non" &&
            element[columns.general.englishMentoring.name] == "Non"
        ) {
            element[columns.general.frenchMentoring.name] = "Oui";
            // console.log(element[columns.general.frenchMentoring.name]);
            /*  var test = getRandomInt(0, 1);
                                                                                                                                                if (test) {
                                                                                                                                                    element[columns.general.frenchMentoring.name] = "Oui";
                                                                                                                                                } else {
                                                                                                                                                    element[columns.general.englishMentoring.name] == "Oui";
                                                                                                                                                }*/
        }
    });
}
var mentees = generateData("mentee", 0, 200);

var mentors = generateData("mentor", 601, 801);

clean(mentees);

clean(mentors);

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

var menteesHeader = [];

for (let name in mentees[0]) {
    menteesHeader.push({ id: name, title: name });
}

const csvWriterMentees = createCsvWriter({
    path: "C:/Dev/total-matching/algo_match/data/mentees-test.csv",
    fieldDelimiter: ";",
    header: menteesHeader,
    encoding: "latin1",
});

csvWriterMentees
    .writeRecords(mentees) // returns a promise
    .then(() => {
        console.log("Generated mentees...Done");
    });

var mentorsHeader = [];
for (let name in mentors[0]) {
    mentorsHeader.push({ id: name, title: name });
}

const csvWriterMentors = createCsvWriter({
    path: "C:/Dev/total-matching/algo_match/data/mentors-test.csv",
    fieldDelimiter: ";",
    header: mentorsHeader,
    encoding: "latin1",
});

csvWriterMentors
    .writeRecords(mentors) // returns a promise
    .then(() => {
        console.log("Generated mentors...Done");
    });

//console.log(mentees, mentors);
//console.log(base.length, getRandomInt(2));