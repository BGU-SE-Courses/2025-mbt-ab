/* @provengo summon selenium */

/**
 * Teacher creates a Choice Activity for testing deletion.
 */
bthread('teacherCreateChoiceActivity', function() {
    let s = new SeleniumSession('teacherCreate')
    s.start(URL)
    bp.sync({request: bp.Event("Creating Choice Activity")})
    loginTeacher(s)
    enterCourse(s)
    let choiceActivity = choose(Object.values("choice")) // Select a Choice Activity
    let activityName = choiceActivity.name
    addChoiceActivity(s, {activityName: activityName, description: choiceActivity.description})
    logout(s)
    // Store the activity name for reference in deletion
    bp.store.put('activityName', activityName)
    bp.sync({request: bp.Event("Choice Activity Added")})
})


/**
 * Teacher deletes the Choice Activity after it was created.
 *
 * NOTE: This thread is blocked until the Choice Activity is created.
 */
bthread('teacherDeleteChoiceActivity', function(){
  bp.sync({request: bp.Event("Deleting Choice Activity")})
  let activityName = bp.store.get('activityName') // Retrieve the stored activity name
  let s = new SeleniumSession('teacherDelete')
  s.start(URL)
  loginTeacher(s)
  enterCourse(s)
  deleteActivity(s, {activityName: activityName})
  logout(s)
  bp.sync({request: bp.Event("Choice Activity Deleted")})
})


/**
 * Blocking the teacher from deleting the activity before it is created.
 * Waiting until the teacher adds the Choice Activity.
 */
bthread('ValidateDelete', function(){
  bp.sync({
    waitFor: bp.Event("Choice Activity Added"),
    block: [bp.Event("Deleting Choice Activity")]
  });
})