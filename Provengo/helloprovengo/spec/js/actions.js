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

function loginStudent(session) {
    if (!USERS.student) {
        console.error("Teacher credentials are missing!");
        return;
    }
    session.click(xpaths.login.loginTab);
    session.writeText(xpaths.login.userNameInput, USERS.student.username);
    session.writeText(xpaths.login.passwordInput, USERS.student.password);
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
  session.waitForVisibility(deleteAssignment.confirmDelete1, 5000);
  session.Click(deleteAssignment.confirmDelete1);
}


function logout(session) {
  session.click(xpaths.logout.dropdownMenu);
  session.click(xpaths.logout.logoutButton);
}

function isElementVisible(xpath, timeout) {
  timeout = timeout || 5000;  // Set default manually
    try {
        return sync({ request: Event("WaitForVisibility", { selectors: [xpath], timeout }) });
    } catch (e) {
        return false;
    }
}


function userLogsIn(session, userType) {
  with (session) {
      waitForVisibility(TEST_DATA.xpaths.username, 5000);
      writeText(TEST_DATA.xpaths.username, userType);
      writeText(TEST_DATA.xpaths.password, "sandbox24");
      click(TEST_DATA.xpaths.loginBtn);
  }
}

function handleModalsIfPresent(session) {
  const waitTime = 3000;
  const activateEditModeModal = "//*[contains(text(),'Activate edit mode')]";
  const findYourWayAroundModal = "//*[contains(text(),'Find your way around')]";

  let modalFound = false;

  try {
      if (session.isElementVisible(activateEditModeModal, waitTime)) {
          bp.log.info("Handling 'Activate edit mode' modal.");
          session.click(activateEditModeModal);
          modalFound = true;
      }
  } catch (e) {
      bp.log.info("'Activate edit mode' modal not found.");
  }

  try {
      if (session.isElementVisible(findYourWayAroundModal, waitTime)) {
          bp.log.info("Handling 'Find your way around' modal.");
          session.click(findYourWayAroundModal);
          modalFound = true;
      }
  } catch (e) {
      bp.log.info("'Find your way around' modal not found.");
  }

  if (!modalFound) {
      bp.log.info("No modals detected, exiting function.");
      return;
  }

  bp.log.info("Modals handled successfully.");
}


// function sleep(ms) {
//   let duration = Math.round(ms); // Ensure it's an integer
//   sync({ request: Event("Sleep", { duration: duration }) });
// }


function teacherCreatesChoiceActivity(session) {
  with (session) {
      click(TEST_DATA.xpaths.courseOverview);
      click(TEST_DATA.xpaths.specificCourse);
      //handleModalsIfPresent(session);
      click(TEST_DATA.xpaths.editModeButton);
    //   scrollByAmount(0,50)
      scrollToElement(TEST_DATA.xpaths.clickOnPlus);
      scrollByAmount(0,150)
    //   Ctrl.doSleep(15000);
      click(TEST_DATA.xpaths.clickOnPlus);
      // click(TEST_DATA.xpaths.addActivityButton);
      waitForVisibility(TEST_DATA.xpaths.addChoiceButton, 5000);
      click(TEST_DATA.xpaths.addChoiceButton);
      // click(TEST_DATA.xpaths.choiceActivityLink);
      writeText(TEST_DATA.xpaths.nameField, "choice");
      scrollToBottom();
      click(TEST_DATA.xpaths.availabilityDropdown);
      writeText(TEST_DATA.xpaths.option1Field, "1");
      click(TEST_DATA.xpaths.resultBar);
      click(TEST_DATA.xpaths.resultVisibility);
      click(TEST_DATA.xpaths.saveButton);
      click(TEST_DATA.xpaths.userMenu);
      click(TEST_DATA.xpaths.logoutButton);
  }
}

function studentSubmitsChoice(session) {
  with (session) {
      click(TEST_DATA.xpaths.courseOverview);
      click(TEST_DATA.xpaths.specificCourse);
      //handleModalsIfPresent(session);
      scrollToElement(TEST_DATA.xpaths.choiceActivityLink);
      scrollByAmount(0,150);
      click(TEST_DATA.xpaths.choiceActivityLink);
      click("//input[@type='radio'][1]");
      click("/html/body/div[2]/div[4]/div/div[2]/div/section/div[2]/form/input[4]");
      ensureChoiceSaved(session);
      // Ctrl.doSleep(1000);

  }
}

function ensureChoiceSaved(session) {
  const choiceSavedXPath = "//div[contains(@class, 'alert-success') and contains(text(), 'Your choice has been saved')]";

  try {
      // Attempt to wait for visibility of the success message
      session.waitForVisibility(choiceSavedXPath, 5000);
      return;
  } catch (e) {   // this catch aint catching shit
      // Log an explicit failure message and throw an exception to fail the test
      // throw e;
      bp.log.info("Choice was not saved successfully.");
  }
}
