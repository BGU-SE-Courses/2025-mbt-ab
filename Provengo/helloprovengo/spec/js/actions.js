/* @provengo summon selenium */

/**
 * actions.js - Defines actions for automated testing using Provengo.
 */

function loginTeacher(session) {
    if (!USERS.teacher) {
        console.error("Teacher credentials are missing!");
        return;
    }
    session.click(xpaths.login.loginTab);
    session.writeText(xpaths.login.userNameInput, USERS.teacher.username);
    session.writeText(xpaths.login.passwordInput, USERS.teacher.password);
    session.click(xpaths.login.loginButton);
}


function enterCourse(session) {
  session.click(xpaths.courses.myCoursesTab);
  session.click(xpaths.courses.CourseQE);
}

function enterEditMode(session) {
  session.click(xpaths.add_choice_activity.editMode);
}


function addChoiceActivity(session) {
  session.click(xpaths.add_choice_activity.addActivity);
  session.click(xpaths.add_choice_activity.addChoiceActivity);
}

function deleteActivity(session) {
  session.click(deleteAssignment.openMenu);
  session.click(deleteAssignment.deleteOption);

  try {
    session.click(deleteAssignment.confirmDelete1);
  } catch (error) {
    session.click(deleteAssignment.confirmDelete2);
  }
}


function logout(session) {
  session.click(xpaths.logout.dropdownMenu);
  session.click(xpaths.logout.logoutButton);
}
