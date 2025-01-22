package hellocucumber;

import io.cucumber.java.Before;
import io.cucumber.java.en.*;
import io.cucumber.java.en.*;
import io.cucumber.java.en.*;

import java.time.Duration;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;



import java.time.Duration;
import java.util.ArrayList;
import java.util.List;




import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class StepDefinitions {
    // הגדרת WebDriver ברמת המחלקה
    WebDriver driver;

    // אתחול driver לפני כל בדיקה
    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "Selenium/chromedriver.exe"); // עדכן את הנתיב הנכון
        driver = new ChromeDriver(new ChromeOptions().addArguments("--headless")); // או אפשר ללא --headless אם תרצה לראות את הדפדפן
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
    // Teacher / Moodle Steps
    // -----------------------------------------------------------------------------

    // Given: Teacher is logged into Moodle
    @Given("the teacher is logged into Moodle")
    public void theTeacherIsLoggedIn() {
        driver.get("https://sandbox.moodledemo.net/login/index.php");
        driver.findElement(By.id("username")).sendKeys("teacher");
        driver.findElement(By.id("password")).sendKeys("sandbox24");
        driver.findElement(By.id("loginbtn")).click();
    }




}
