Feature: Student answers a choice activity

  Scenario: A student selects an option in a choice activity
    Given the student is logged into the Moodle site
    And the student navigates to the choice activity
    When the student selects an option and submits
    Then the submission should be successful
    And the student should see a confirmation message