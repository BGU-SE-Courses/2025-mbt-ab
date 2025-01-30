# Testing Moodle using Cucumber
This directory contains the cucumber files for testing the Choice Activity module of the Moodle application.

## Running the tests
Run ```mvn test``` to run all the tests.

## Feature files
The behaviors that we tested are in the feature files that inside the [resources/hellocucumber](resources/hellocucumber) directory. See the files for a detailed description of the tests.

These feature files define the test scenarios covering the user interactions for:

1.A student answering a choice activity.

2.A teacher deleting a choice activity.

## Step files
The step files in the [src/test/java/hellocucumber](src/test/java/hellocucumber) directory contain the code that defines how each sentence in the feature files is translated to Selenium actions. See the files for a detailed description of the implementation.

