# Software Quality Engineering - System Testing
This is a repository for the system-testing assignment of the Software Quality Engineering course at the [Ben-Gurion University](https://in.bgu.ac.il/), Israel.

## Assignment Description
In this assignment, we tested an open-source software called Moodle.

Moodle is a free and open-source learning management system.
Moodle is used for blended learning, distance education, flipped classroom and other online learning projects in schools, universities, workplaces and other sectors.
Moodle is used to create custom websites with online courses and allows for community-sourced plugins.
Moodle offers a variety of interactive tools, such as quizzes, assignments, and choice activities, to enhance learning experiences.
Our testing focused on the choice activity feature, where students can select an option in response to a question, and teachers can manage these activities within their courses.
Specifically, our tests validate the following user story:
A student answers a choice activity, ensuring their selection is successfully recorded.
A teacher deletes the choice activity, verifying that it is removed from the course.


## Installation
we followed the instractions from this link: 
https://docs.moodle.org/405/en/Complete_install_packages_for_Windows?_gl=1*65l900*_ga*MTA1Njg2MDk3Ni4xNzM2NTAyNTM0*_ga_QWYJYEY9P5*MTczNjUwODY0MS4yLjEuMTczNjUwOTQyOC4wLjAuMA..

we downloaded it from this link:
https://download.moodle.org/windows/?_gl=1*1x9n0gr*_ga*MTA1Njg2MDk3Ni4xNzM2NTAyNTM0*_ga_QWYJYEY9P5*MTczNjUwODY0MS4yLjEuMTczNjUxMDI0My4wLjAuMA..

we chose 4.5.1+ version

install the server in the Moodle folder and chages paths in the reset files
## What we tested
User story: A student answers a choice activity.

Preconditions: There is a course with an existing choice activity, and the student has access to participate in it.

Expected outcome: The student successfully selects an option and submits their response. The selection is recorded.


User story: A teacher deletes a choice activity.

Preconditions: There is a course with an existing choice activity, and the teacher has the necessary permissions to delete 
activities.

Expected outcome: The choice activity is successfully deleted from the course and is no longer available to students.

## How we tested
We used two different testing methods:
1. [Cucumber](https://cucumber.io/), a behavior-driven testing framework.
2. [Provengo](https://provengo.tech/), a story-based testing framework.

Each of the testing methods is elaborated in its own directory. 

## Results
Update all README.md files (except for d-e, see Section 1). Specifically, replace all $$*TODO*…$$ according to the instructions inside the $$.

## Detected Bugs
We detected the following bugs:

1. Bug 1: 
   1. General description: ...
   2. Steps to reproduce: ...
   3. Expected result: ...
   4. Actual result: ...
   5. Link to the bug report: (you are encouraged to report the bug to the developers of the software)
2. Bug 2: ...

$$*TODO* if you did not detect the bug, you should delete this section$$  
