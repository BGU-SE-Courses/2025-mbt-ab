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
  bp.sync({request: bp.Event("bla bla")})
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

bthread("Teacher Creates Choice Activity", function () {
   sync ({waitFor: Event("bla bla")});
  sync({ request: Event("Teacher start") });
  let session = new SeleniumSession("TeacherSession", "chrome");
  session.start(TEST_DATA.urls.login);

  sync({ request: Event("Teacher log in") });
  userLogsIn(session, "teacher");
  sync({ request: Event("Teacher loged in") });
  sync({ request: Ctrl.markEvent("Teacher loged in") });
  sync({ request: Event("Creating Choice") });
  teacherCreatesChoiceActivity(session);
  sync({ request: Event("Choice Created") });
  sync({ request: Ctrl.markEvent("Choice Created") });
  session.close();
  sync({ request: Event("Teacher done") });
  sync({ request: Ctrl.markEvent("Teacher done") });


});

bthread("Student Selects Choice", function () {
  sync({ waitFor: Event("Choice Created") });
  sync({ request: Event("Student start") });
  let session = new SeleniumSession("StudentSession", "chrome");
  session.start(TEST_DATA.urls.login);
  sync({ request: Event("Student log in") });
  userLogsIn(session, "student");
  sync({ request: Event("Student loged in") });
  sync({ request: Ctrl.markEvent("Student loged in") });

  // sync({ waitFor: Event("Choice Created") });
  sync({ request: Event("Student answers choice") });
  studentSubmitsChoice(session);
  sync({ request: Ctrl.markEvent("Student answers choice") });

  session.close();
  sync({ request: Event("Student done") });
  sync({ request: Ctrl.markEvent("Student done") });
});