# Web Programming Assignment

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/)

# Getting Started

- Install dependencies

```
cd <project_name>
npm install
```

- Build and run the project

```
npm start
```

Navigate to `http://localhost:8080`

# Key Features

## Make a New Entry

- The user is able to make a new entry by clicking the "New Entry" button in the top left corner of the home page. This links to a page called "new_entry" where the user is greeted with a form that allows them to enter the date, work carried out, knowledge and experience gained or applied, and the competencies gained. The user can also press the "back to all entries link" if they wish to go back to the home page.

- All fields must have information in them or the data will not be processed. When the user tries to send of information without all fields being filled, the highest field with no information will display a message saying "Please fill out this field". Once all fields have been filled, the user can then press the submit button to send the information to the server. Alternatively, the user can press the enter key in the competency field to submit the data when all fields have been filled. The information will then be displayed in table format in the homepage.

## Displaying Entries

- Once the user has made at least one entry, that information will be displayed in a table on the homepage, index.html. The table displays each entry on its own row, with the categories in their own cells. Each entry also has an option for the user to either edit the entered information, or delete the entry entirely.

## Editing an Entry

- The user caan click on the "edit entry" link to take them a page that allows them to update the information of a previously made entry. The information entered already appears their respected fields, all that is left is for the user to edit the information and then press the update button to update the information. The user can also press the "back to all entries link" if they wish to go back to the home page.

## Deleting an Entry

- If the user wishes to delete an entry entirely, they can press the "delete" button on the row of the entry they want deleted. The information is then permanently erased from the database with no way to recover it.

## Read Only

- The read only page follows the same principles as the homepage, the information is displayed in a table and each entry has its own row. The only difference here is that on this page there is no way for the user to edit or delete an entry. There is also a button in the top left of the page called "Print Table", which when clicked, shows the option for the user to print the table with all their entries. The button is on this page so that the edit and delete buttons do not get shown in the printed version.

## Navigation

- There is a navigation bar in the top left of the screen which allows the user to navigate between the home page and the read only page. The user can access the new entry page by clicking the "new entry" button in the home page. They can access the edit entry page by clicking the "edit entry" link on an entry.

## Printing Format

- The user can print the table by either navigating to the read only page and clicking the "Print Table" button, or by pressing "ctrl + p". The document has been formatted so that it doesn't show any of the buttons or links, the only things showing on the document are the title of the page and the table itself with all of its information.
