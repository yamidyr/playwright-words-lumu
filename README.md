# AUTOMATED TEST SUIT
Steps to run this project in your machine:

## Requirements:
Before to continue make sure to have the folowing requirements:
* **Node.js** (v26.10.0)
* **npm** (included in node)
* **Git**

Then follow this steps:

1) **Clone the project:**
In a terminal execute the following command:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   ```
2) **Go to the project folder:**
Execute the following command in the same terminal
```bash
   cd <FOLDER_NAME_OF_THE_PROJECT>
   ```
3) **Install Node.js dependencies:**
Execute the following command in the same terminal
```bash
   npm install
   ```
4) **Install Playwright browsers:**
```bash
   npx playwright install
   ```
# Execute the tests: 
```bash
  npx playwright test
  ```
A page is automatically displayed in your default browser with the error report. But you can 
execute the following command to have the report as well:

```bash
npx playwright show-report
```
