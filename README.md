# PROJECT

## Installation ##
1. Unzip the project
2. Cd into the project's directory
3. Make sure you have node.js installed (https://nodejs.org/en/)
	run `node -v` and `npm -v` to check
4. Run `npm i` to install the packages
5. Run `npm start` to start the app (it will be on `localhost:3000`)
	it might take a while to start the server for the first time
    
## Functionalities ##
1. The JSON file is stored in src/Assets/resource_data.json
2. The left section of the tree view is the global resource state:
    1. Adding, removing, or restructuring the resource within this tree will automatically update the global resource data.
    2. Selecting: Open a detailed information view of the selected resource
    3. Edit: Open an edit view of the selected resource where you can make changes to the details
3. Tree view: 
    1. Right click to open context menu
    2. Adding a resource will create a resource with empty details, initialize the ID and name with a random number (for simplicity)
    3. Currently the checkbox does not have any functionality yet
4. Resource card view:
    1. Edit button: To modify details
    2. Delete & Save button: Open a confirmation modal and automatically update the global resource. The main tree view will update the structure accordingly as well as the details.
    1. Users: Add a new user by clicking the + button or pressing the enter key. Remove a user by clicking the x button within the tag.
    2. Resource List: 
        1. Add a new resource by clicking the + button or right-clicking the resource. Remove the resource by right-clicking the resource.
        2. The tree view will update accordingly if there is an update to the main tree structure. You can try to restructure the main tree.

## Todo improvements ##

Here are some improvements that can be done as the project scales

1. Decompose components into a few smaller components
2. Style improvements: more focus on CSS, design, responsiveness
3. Further optimization: such as memoizing react components (useMemo, useCallback), or modifying the tree data structure or algorithm
4. Write testing for every component (for example jest & react-testing-library)
5. CSS-in-JS (for example emotionJS, React styled-components)
6. Removing unnecessary comments (I intentionally added more comments for this purpose)
7. Documentation on redux actions and util functions
