# dIAC Repository
This repository contains the `jsPsych` scripts for the dIAC ("digitized Invented Alien Creatures"), including both the participant task and the rater task.

## Repository structure

- `ParticipantTask/`: jsPsych script for administering the dIAC to participants
- `RaterTask/`: jsPsych script for collecting ratings from external judges

---

The **dIAC participant task** implements the experimental workflow of the IAC task, including instructions, training, and experimental trials. In each trial, participants first create a creature using CrCrCr ("Creative Creature Creator") and then provide a name and a description for it.

The **dIAC rater task** is designed to be used once participants have completed the dIAC and generated their creatures. It allows external judges to log in with a rater ID and evaluate the final products through an organized catalog interface. The catalog makes it easy to navigate across creatures, shows which ratings have already been completed and how many remain, and allows raters to revisit the instructions at any point during the task.

-- 

Details of the current procedure of both the _participant-task_ and the _rater-task_ are available in our [preprint]. Researchers are welcome to download, use, and adapt the script to fit their own research aims. Questions, suggestions, and feedback about the code are very welcome.
