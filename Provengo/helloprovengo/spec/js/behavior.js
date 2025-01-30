/* @provengo summon selenium */

///**
// * Teacher creates a Choice Activity for testing deletion.
// */
//bthread('teacherCreateChoiceActivity', function() {
//    let s = new SeleniumSession('teacherCreate')
//    s.start(URL)
//    bp.sync({request: bp.Event("Creating Choice Activity")})
//    loginTeacher(s)
//    teacherCreatesChoiceActivity(s);
//    s.close();
//    bp.sync({request: bp.Event("Choice Activity Added")})
//
//})
//
///**
// * Teacher deletes the Choice Activity after it was created.
// *
// * NOTE: This thread is blocked until the Choice Activity is created.
// */
//bthread('teacherDeleteChoiceActivity', function(){
//   bp.sync({waitFor: bp.Event("Choice Activity Added")})
//  bp.sync({request: bp.Event("Deleting Choice Activity")})
//  let activityName = bp.store.get('activityName') // Retrieve the stored activity name
//  let s = new SeleniumSession('teacherDelete')
//  s.start(URL)
//  loginTeacher(s)
//  enterCourse(s)
//  enterEditMode(s)
//  deleteActivity(s, {activityName: "choice"})
//  logout(s)
//  s.close();
//  bp.sync({request: bp.Event("Choice Activity Deleted")})
//  bp.sync({request: bp.Event("bla bla")})
//
//})


///**
// * Blocking the teacher from deleting the activity before it is created.
// * Waiting until the teacher adds the Choice Activity.
// */
//bthread('ValidateDelete', function(){
//  bp.sync({
//    waitFor: bp.Event("Choice Activity Added"),
//    block: [bp.Event("Deleting Choice Activity")]
//  });
//})

bthread("Teacher Creates Choice Activity", function () {
   //sync ({waitFor: Event("bla bla")});
  sync({ request: Event("Teacher start") });
  let s = new SeleniumSession('teacherCreate')
  s.start(URL)

  sync({ request: Event("Teacher log in") });
  loginTeacher(s);
  sync({ request: Event("Teacher loged in") });
  sync({ request: Ctrl.markEvent("Teacher loged in") });
  sync({ request: Event("Creating Choice") });
  teacherCreatesChoiceActivity(s);
  sync({ request: Event("Choice Created") });
  sync({ request: Ctrl.markEvent("Choice Created") });
  s.close();
  sync({ request: Event("Teacher done") });
  sync({ request: Ctrl.markEvent("Teacher done") });


});

bthread("Student Selects Choice", function () {
  sync({ waitFor: Event("Choice Created") });
  sync({ request: Event("Student start") });
  let s = new SeleniumSession('studentCreate')
  s.start(URL)

  sync({ request: Event("Student log in") });
  loginStudent(s);
  sync({ request: Event("Student loged in") });
  sync({ request: Ctrl.markEvent("Student loged in") });

  // sync({ waitFor: Event("Choice Created") });
  sync({ request: Event("Student answers choice") });
  studentSubmitsChoice(s);
  sync({ request: Ctrl.markEvent("Student answers choice") });

  s.close();
  sync({ request: Event("Student done") });
  sync({ request: Ctrl.markEvent("Student done") });
});