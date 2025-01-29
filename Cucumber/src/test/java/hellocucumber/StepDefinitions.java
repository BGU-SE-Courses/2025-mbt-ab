package hellocucumber;


import io.cucumber.java.AfterAll;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.*;

import java.time.Duration;


import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.jupiter.api.Assertions.assertTrue;


public class StepDefinitions {
    private static WebDriver driver;
    private static WebDriverWait wait;
    private static String MOODLE_URL = "http://localhost:8080";




    @BeforeAll
    public static void setUp() {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\hadar\\Desktop\\yearB\\atp\\2025-mbt-ab\\Selenium\\chromedriver.exe");
        ChromeOptions options = new ChromeOptions();
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.manage().window().maximize();
        driver.get(MOODLE_URL);
    }

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }





    // $$*TODO* explain what this step does$$
    @Given("an example scenario")
    public void anExampleScenario() {
    }
    // $$*TODO* explain what this step does$$
    @When("all step definitions are implemented")
    public void allStepDefinitionsAreImplemented() {
    }
    // $$*TODO* explain what this step does$$
    @Then("the scenario passes")
    public void theScenarioPasses() {
    }


    // -----------------------------------------------------------------------------
    // Helper Methods
    // -----------------------------------------------------------------------------

    private void Click(String xPath) {
        try {
            Thread.sleep(20);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xPath))).click();
    }

    private void attemptClickOnXpaths(String primaryXPath, String fallbackXPath) {
        try {
            // Try clicking the primary element if it becomes visible
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(primaryXPath))).click();
        } catch (TimeoutException firstAttempt) {
            try {
                // If the first element is not found, attempt to click the fallback element
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(fallbackXPath))).click();
            } catch (TimeoutException secondAttempt) {
                System.err.println("Neither of the provided XPaths were clickable.");
            }
        }
    }


    private void inputText(String targetXPath, String inputText) {
        try {
            // Wait for the element to be visible before interacting
            WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(targetXPath)));

            // Clear any existing text and enter the new input
            element.clear();
            element.sendKeys(inputText);
        } catch (Exception exception) {
            // Print the exception details if an error occurs
            exception.printStackTrace();
        }
    }

    private void teacherLogin() {
        // Teacher credentials
        String teacherUsername = "teacher";
        String teacherPassword = "Sandbox24#";

        String LoginEnter = "//*[@id=\"usernavigation\"]/div/div/span/a";
        String UsernameInput = "//*[@id=\"username\"]";
        String PasswordInput = "//*[@id=\"password\"]";
        String LoginSubmit = "//*[@id=\"loginbtn\"]";


        Click(LoginEnter);
        inputText(UsernameInput, teacherUsername);
        inputText(PasswordInput, teacherPassword);
        Click(LoginSubmit);
    }


    private void enterQE() {
        String MyCourses = "/html/body/div[2]/nav/div/div[1]/nav/ul/li[3]/a";
        String QE="/html/body/div[2]/div[3]/div/div[2]/div/section/div/aside/section/div/div/div[1]/div[2]/div/div/div[1]/div/div/div/div/div[1]/div/div/a/span[3]/span[2]";
        Click(MyCourses);
        Click(QE);
    }

    private void enterEditMode() {
        String EditMode = "/html/body/div[2]/nav/div/div[2]/form/div/div";
        Click(EditMode);
    }

    private void performTeacherLogout() {
        String dropdownMenuXPath = "//*[@id=\"user-menu-toggle\"]";
        String logoutButtonXPath = "//*[@id=\"carousel-item-main\"]/a[8]";
        Click(dropdownMenuXPath);
        Click(logoutButtonXPath);
    }


    // -----------------------------------------------------------------------------
    // Teacher / Moodle Steps
    // -----------------------------------------------------------------------------

    // Given: Teacher is logged into Moodle
    @Given("the teacher is logged into Moodle")
    public void theTeacherIsLoggedIn() {
        teacherLogin();
    }

    @Given("a \"Choice Activity\" already exists in the teacher course")
    public void verifyChoiceActivityExists() {
        enterQE();
        enterEditMode();
        String AddActivity = "//li[1]/div[1]/div[2]/div[2]/div[1]/button[1]/div[1]/span[1]";
        String choiceActivity = "//div[2]/div[1]/div[3]/div[1]/a[1]/div[2]";
        String choiceName = "//*[@id='id_name']";
        String option="//*[@id='id_option_0']";
        String savechoiceActivity = "//*[@id='id_submitbutton2']";

        Click(AddActivity);
        Click(choiceActivity);
        inputText(choiceName, "choice");
        inputText(option,"option1");
        Click(savechoiceActivity);

    }

    @When("the teacher selects to delete some activity")
    public void selectChoiceActivityToDelete() {
        String points = "/html/body/div[4]/div[5]/div/div[3]/div/section/div/div/div/ul/li[1]/div[1]/div[2]/ul/li[2]/div[2]/div[2]/div[4]/div/div/div/div/a/i";
        String delete1 = "//li[2]/div[2]/div[2]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/a[8]";
        String delete2 = "/html/body/div[7]/div[2]/div/div/div[3]/button[2]";
        String delete3 = "/html/body/div[8]/div[2]/div/div/div[3]/button[2]";
        Click(points);
        Click(delete1);
        attemptClickOnXpaths(delete2, delete3);
    }



    @Then("the activity should be removed from the list of choice activities")
    public void verifyActivityDeleted() {
        String choiceActivity = "/html/body/div[4]/div[5]/div/div[3]/div/section/div/div/div/ul/li[1]/div[1]/div[2]/ul/li[2]/div[2]";

        // Wait before checking if the activity was deleted
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Sleep interrupted: " + e.getMessage());
        }

        // Verify that the element no longer exists after deletion
        boolean isDeleted = driver.findElements(By.xpath(choiceActivity)).isEmpty();
        assertTrue(isDeleted, "Choice activity was not deleted successfully.");
        performTeacherLogout();
    }











}
