/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

const URL = 'http://localhost:8080';

const xpaths = {
  login: {
    loginTab: '//*[@id="usernavigation"]/div/div/span/a',
    userNameInput: '//*[@id="username"]',
    passwordInput: '//*[@id="password"]',
    loginButton: '//*[@id="loginbtn"]'
  },

  courses: {
    myCoursesTab: '/html/body/div[2]/nav/div/div[1]/nav/ul/li[3]/a',
    CourseQE: '/html/body/div[2]/div[3]/div/div[2]/div/section/div/aside/section/div/div/div[1]/div[2]/div/div/div[1]/div/div/div/div/div[1]/div/div/a/span[3]/span[2]'
  },

  add_choice_activity: {
    editMode: '/html/body/div[2]/nav/div/div[2]/form/div/div',
    addActivity: '//li[1]/div[1]/div[2]/div[2]/div[1]/button[1]/div[1]/span[1]',
    addChoiceActivity: '//div[2]/div[1]/div[3]/div[1]/a[1]/div[2]'
  },

  logout: {
    dropdownMenu: '//*[@id="user-menu-toggle"]',
    logoutButton: '//*[@id="carousel-item-main"]/a[8]'
  }

};

const deleteAssignment = {
  openMenu: "/html/body/div[4]/div[5]/div/div[3]/div/section/div/div/div/ul/li[1]/div[1]/div[2]/ul/li[2]/div[2]/div[2]/div[4]/div/div/div/div/a/i",
  deleteOption: "//li[2]/div[2]/div[2]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/a[8]",
  confirmDelete1: "//button[contains(@class, 'btn-danger') and @data-action='delete']",
  confirmDeleteScrollCorrection: 20
};

const USERS = {
  teacher: {
    username: 'teacher',
    password: 'Sandbox24#'
  },
  student: {
    username: 'student',
    password: 'Sandbox24#'
  }
};

const COURSES = [
  {
    title: 'QE'
  }
];

const TEST_DATA = {
  urls: {
      login: 'http://localhost:8080'
  },
  xpaths: {
       loginTab: '//*[@id="usernavigation"]/div/div/span/a',
      username: '//*[@id="username"]',
      password: "//*[@id='password']",
      loginBtn: "//*[@id='loginbtn']",
      courseOverview: "/html/body/div[2]/nav/div/div[1]/nav/ul/li[3]/a",
      specificCourse: '/html/body/div[2]/div[3]/div/div[2]/div/section/div/aside/section/div/div/div[1]/div[2]/div/div/div[1]/div/div/div/div/div[1]/div/div/a/span[3]/span[2]',
      activateEditModeModal: "//*[contains(text(),'Activate edit mode')]",
      findYourWayAroundModal: "//*[contains(text(),'Find your way around')]",
      editModeButton: "/html/body/div[2]/nav/div/div[2]/form/div/div",
      clickOnPlus: "//*[text()='Add an activity or resource']",
      // addActivityButton: "//*[@id='yui_3_18_1_1_1738085433156_293']/div[2]",
      addChoiceButton: "//*[@title='Add a new Choice']",
      choiceActivityLink: "//*[contains(text(), 'choice')]",
      nameField: "//*[@id='id_name']",
      availabilityDropdown: "/html/body/div[5]/div[5]/div/div[3]/div/section/div/form/fieldset[2]/div[2]/div[1]/div[2]/select/option[2]",
      option1Field: "//div[5]/div[2]/input[1]",
      resultBar: "//fieldset[4]/div[1]/div[1]/a[1]",
      resultVisibility: "/html/body/div[5]/div[5]/div/div[3]/div/section/div/form/fieldset[4]/div[2]/div[1]/div[2]/select/option[2]",
      saveButton: "//div[1]/span[1]/input[1]",
      userMenu: '//*[@id="user-menu-toggle"]',
      logoutButton: "//*[contains(text(),'Log out')]"
  }
};
