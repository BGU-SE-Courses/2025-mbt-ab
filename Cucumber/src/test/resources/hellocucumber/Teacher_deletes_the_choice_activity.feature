Feature: Teacher can delete a choice activity in Moodle

  Scenario: Teacher deletes a choice activity
    Given the teacher is logged into Moodle
    And a "Choice Activity" already exists in the teacher course
    When the teacher selects to delete some activity
    Then the activity should be removed from the list of choice activities

