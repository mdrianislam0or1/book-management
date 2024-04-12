# Book Management Dashboard

## Product Information

Each product must have the following information:

- Product name
- Product price
- Product quantity

## Requirements

### Objective

The primary objective of this assignment is to design and implement a comprehensive Book Management Dashboard, providing the tools to efficiently manage the book inventory, track sales, and analyze sales history. The assignment will incorporate features such as authentication, CRUD operations, state management, real-time UI updates, and book filtering.

### Authentication

#### User Registration and Login:

- Users must register and log in to access the dashboard.
- Use JWT (JSON Web Tokens) for secure authentication.
- For now, there will be a single role, essentially a user responsible for managing the system.

### Functionality

#### Book Management

##### CRUD Operations:

- Add a new book to the inventory.
- Delete existing books from the inventory.
- Update book details.
- Read and view the list of books in the inventory.

##### Filtering System:

- Implement a robust filtering system to effectively narrow down book selections based on various criteria.

#### Sales Management

- Users can search for a product to sell, and upon finding it, they can click the "Sell" button.
- On clicking the sell button, a form will pop up with fields such as:
  - Quantity of the product to be sold
  - Name of the buyer
  - Date of the sale
- If the quantity reaches zero, the product will be removed from the inventory.

#### Sales History

- View sales history categorized by:
  - Weekly
  - Daily
  - Monthly
  - Yearly

#### Book Filtering (Implement on the book management page)

- Implement a comprehensive book filter system to optimize inventory management.
- Filter options should include:
  - Price
  - Release Date
  - Author
  - ISBN
  - Genre
  - Publisher
  - Series
  - Language
  - Additional relevant filter parameters

### User Interface Features

- Gracefully update the UI in real-time when changes occur.
- Utilize RTK Query for efficient CRUD operations.
- Implement Re-fetching functionality to ensure data accuracy and consistency.

### State Management

- Utilize Redux for state management to maintain a consistent application state.

### Bulk Delete Product Options

- Enable users to efficiently manage their inventory by implementing a bulk delete feature for the books.
- Provide a user-friendly interface to select and delete multiple book options simultaneously.

### Additional Features

- Implement any other relevant features that enhance the usability and functionality of the dashboard.

### Technical Requirements

- Use RTK Query for efficient CRUD operations.
- Implement Redux for state management.
- Ensure the UI updates gracefully in real-time.
- Use the Re-fetching functionality for data accuracy.
- Apply tags for improved organization and categorization.
- Optimize for mobile responsiveness to ensure a reasonable user experience on various devices.
- Ensure there are at least 10 commits in your GitHub repository.
- Avoid the use of AI tools or libraries for generating code. Write the code manually to demonstrate a clear understanding of the concepts.
- You can create the backend for this assignment on a single page, but we highly recommend applying the modular pattern introduced in Level 2 for enhanced code organization and maintainability.
