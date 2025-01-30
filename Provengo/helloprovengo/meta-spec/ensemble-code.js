// @provengo summon ctrl

/**
 * List of events "of interest" that we want test suites to cover.
 */
const GOALS = [
    Ctrl.markEvent("Teacher logged in"),
    Ctrl.markEvent("Choice Created"),
    Ctrl.markEvent("Teacher deleted choice"),
    Ctrl.markEvent("Teacher done"),

    Ctrl.markEvent("Student logged in"),
    Ctrl.markEvent("Student answers choice"),
    Ctrl.markEvent("Student done")
];

/**
 * Ranks test suites by how many events from the GOALS array were met.
 * The more goals are met, the higher the score.
 *
 * It makes no difference if a goal was met more than once.
 *
 * @param {Event[][]} ensemble The test suite to be ranked.
 * @returns Number of events from GOALS that have been met.
 */
function rankByMetGoals(ensemble) {
    const unreachedGoals = [...GOALS];

    for (let test of ensemble) {
        for (let event of test) {
            for (let i = unreachedGoals.length - 1; i >= 0; i--) {
                if (unreachedGoals[i].contains(event)) {
                    unreachedGoals.splice(i, 1);
                }
            }
        }
    }

    return GOALS.length - unreachedGoals.length;
}

// Generate all possible two-way combinations (Pairwise Coverage)
const pairs = [
    // Teacher creating the choice activity
    ["Teacher logged in", "Teacher Creating Choice Activity"],
    ["Teacher Creating Choice Activity", "Choice Activity Added"],
    ["Choice Activity Added", "Teacher done"],

    // Student answering the choice activity
    ["Student logged in", "Choice Activity Added"],
    ["Student logged in", "Student answers choice"],
    ["Student answers choice", "Student done"],

    // Teacher deleting the choice activity
    ["Teacher logged in", "Teacher Deleting Choice Activity"],
    ["Choice Activity Added", "Teacher Deleting Choice Activity"],
    ["Teacher Deleting Choice Activity", "Choice Activity Deleted"],
    ["Choice Activity Deleted", "Teacher done"],

    // Order combinations between teacher & student
    ["Choice Activity Added", "Student answers choice"],
    ["Student answers choice", "Teacher Deleting Choice Activity"],
    ["Teacher Deleting Choice Activity", "Student done"]
];

// **Create a behavior thread (bthread) for each two-way pairwise test**
pairs.forEach(([event1, event2]) => {
    bthread(`Pairwise Test (${event1}, ${event2})`, function () {
        sync({ waitFor: Ctrl.markEvent(event1) });
        sync({ waitFor: Ctrl.markEvent(event2) });

        // Ensure pair order consistency for tracking
        let orderedPair = [event1, event2].sort().join("_");
        sync({ request: Ctrl.markEvent(`Pairwise_${orderedPair}`) });
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
 * Ranks potential test suites based on both:
 *  - **Pairwise event orders** (Two-Way Coverage)
 *  - **General event coverage** (GOALS array)
 *
 * @param {Event[][]} ensemble The test suite/ensemble to be ranked.
 * @returns The percentage of goals covered by `ensemble`.
 */
function rankingFunction(ensemble) {
    // How many goals did `ensemble` hit?
    const metGoalsCount = rankByMetGoals(ensemble);
    const metPairsCount = rankByPairwiseCoverage(ensemble);
    // What percentage of the goals & pairs did `ensemble` cover?
    const goalsCoverage = (metGoalsCount / GOALS.length) * 100;
    const pairsCoverage = (metPairsCount / pairs.length) * 100;
    // Final ranking: average of both coverage percentages
    return (goalsCoverage + pairsCoverage) / 2;
}
