//@provengo summon ctrl

/**
 * List of events "of interest" that we want test suites to cover.
 */
const GOALS = [
    Ctrl.markEvent("Teacher loged in"),
    Ctrl.markEvent("Creating Choice Activity"),
    Ctrl.markEvent("Choice Activity Added"),
    Ctrl.markEvent("Teacher done"),
    Ctrl.markEvent("Deleting Choice Activity"),
    Ctrl.markEvent("Choice Activity Deleted"),
    Ctrl.markEvent("Student loged in"),
    Ctrl.markEvent("Student answers choice"),
    Ctrl.markEvent("Student done")
];



/**
 * Ranks test suites by how many events from the GOALS array were met.
 * The more goals are met, the higher the score.
 *
 * It make no difference if a goal was met more then once.
 *
 * @param {Event[][]} ensemble The test suite to be ranked.
 * @returns Number of events from GOALS that have been met.
 */
function rankByMetGoals( ensemble ) {
    const unreachedGoals = [];
    for ( let idx=0; idx<GOALS.length; idx++ ) {
        unreachedGoals.push(GOALS[idx]);
    }

    for (let testIdx = 0; testIdx < ensemble.length; testIdx++) {
        let test = ensemble[testIdx];
        for (let eventIdx = 0; eventIdx < test.length; eventIdx++) {
            let event = test[eventIdx];
            for (let ugIdx=unreachedGoals.length-1; ugIdx >=0; ugIdx--) {
                let unreachedGoal = unreachedGoals[ugIdx];
                if ( unreachedGoal.contains(event) ) {
                    unreachedGoals.splice(ugIdx,1);
                }
            }
        }
    }

    return GOALS.length-unreachedGoals.length;
}

// Generate all possible two-way combinations
let pairs = [
    ["Teacher loged in", "Creating Choice Activity"],
    ["Teacher loged in", "Choice Activity Added"],
    ["Teacher loged in", "Teacher done"],
    ["Teacher loged in", "Student loged in"],
    ["Creating Choice Activity", "Choice Activity Added"],
    ["Creating Choice Activity", "Student loged in"],
    ["Choice Activity Added", "Teacher done"],
    ["Choice Activity Added", "Student loged in"],
    ["Choice Activity Added", "Student answers choice"],
    ["Teacher done", "Student loged in"],
    ["Teacher done", "Student answers choice"],
    ["Teacher done", "Student done"],
    ["Deleting Choice Activity", "Choice Activity Deleted"],
    ["Student loged in", "Student answers choice"],
    ["Student loged in", "Student done"],
    ["Student answers choice", "Student done"]
];




pairs.forEach(([event1, event2]) => {
    bthread(`Pairwise Test (${event1}, ${event2})`, function () {
        sync({ waitFor: Ctrl.markEvent(event1) });
        sync({ waitFor: Ctrl.markEvent(event2) });

        [event1, event2] = [event1, event2].sort();
        sync({ request: Ctrl.markEvent(`Pairwise_${event1}_${event2}`) });
    });
});

/**
 * Ranks test suites by how many pairwise event orders they cover.
 *
 * @param {Event[][]} ensemble The test suite to be ranked.
 * @returns Number of pairwise event orders covered.
 */
function rankByPairwiseCoverage(ensemble) {
    const uncoveredPairs = pairs.map(pair => pair.join("_"));

    for (let test of ensemble) {
        for (let event of test) {
            let eventStr = event.name;
            for (let i = uncoveredPairs.length - 1; i >= 0; i--) {
                if (eventStr.includes(uncoveredPairs[i])) {
                    uncoveredPairs.splice(i, 1);
                }
            }
        }
    }

    return pairs.length - uncoveredPairs.length;
}


/**
 * Ranks potential test suites based on the percentage of goals they cover.
 * Goal events are defined in the GOALS array above. An ensemble with rank
 * 100 covers all the goal events.
 *
 * Multiple ranking functions are supported - to change ranking function,
 * use the `ensemble.ranking-function` configuration key, or the
 * --ranking-function <functionName> command-line parameter.
 *
 * @param {Event[][]} ensemble the test suite/ensemble to be ranked
 * @returns the percentage of goals covered by `ensemble`.
 */
 function rankingFunction(ensemble) {

    // How many goals did `ensemble` hit?
    // const metGoalsCount = rankByMetGoals(ensemble);
    const metPairsCount = rankByPairwiseCoverage(ensemble);

    // What percentage of the goals did `ensemble` cover?
    const metGoalsPercent = metPairsCount/GOALS.length;

    return metGoalsPercent * 100; // convert to human-readable percentage
}



