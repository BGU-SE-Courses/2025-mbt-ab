Feature: Teacher can delete a choice activity in Moodle

  Scenario: Teacher deletes a choice activity
    Given the teacher is logged into Moodle
    And a "Choice Activity" already exists in the course
    When the teacher navigates to the "Choice Activities" section
    And the teacher selects the activity to delete
    Then the activity should be removed from the list of choice activities

