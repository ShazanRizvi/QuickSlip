### QuickSlip - Invoice Generator
QuickSlip Invoice Dashboard is an intuitive, powerful invoicing software designed to help freelancers, small businesses, and enterprises manage their billing processes efficiently.

### Features

- **Easy Invoice Creation**: Generate clean, professional invoices easily with options to include custom details such as logos, payment terms, and more.
- **Dashboard Overview:** View all your invoices at a glance on the dashboard. Track which invoices are paid, pending, or overdue.
- **Cloud based System:** View your invoices anywhere and everywhere.

## Installation

To get the project running locally on your system, please follow the instructions below:

### Prerequisites

- Node.js (version 12.x or above)
- npm (version 6.x or above)

### Cloning the Repository

```bash
git clone https://github.com/ShazanRizvi/QuickSlip.git
```
### Install dependencies for frontend:
```bash
cd frontend
npm install
```
### Install dependencies for server:
```bash
cd server
npm install
```
### Environment variables Configurations for Dev Environment Setup
:
Frontend:
```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_BASE_URL=
```
Server:
```bash
DATABASE_PORT=8082
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL=

# Direct connection to the database. Used for migrations.
DIRECT_URL=

SUPABASE_URL=
SUPABASE_ANON_KEY=

JWT_SECRET=
FIREBASE_STORAGE_BUCKET=
```

### Start the server and Frontend in dev mode:
```bash
cd frontend
npm run dev
cd server
npm start
```
This command will launch the QuickSlip Invoice Dashboard on http://localhost:3000 in your web browser, where you can begin using the application to create and manage your invoices.

### Usage
Here’s how you can start using QuickSlip Invoice Dashboard:

- Create a New Invoice: Navigate to the 'Create New Invoice' button on the dashboard to begin generating an invoice.
- Manage Invoices: Access the 'Your Invoices' section from the sidebar to view, edit, or delete existing invoices.

### Contributing
Contributions to QuickSlip Invoice Dashboard are welcome! Here’s how you can contribute:

- Bug Fixes: If you find a bug and have a fix, please fork the repository, make your fix, and submit a pull request.
- Features: If you have ideas for additional features, please open an issue to discuss them before making changes. This will allow us to discuss the feature and determine how it fits within the scope of the project.
  
### Pull Request Process
- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations, and container parameters.
- Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.
- Your pull request will be merged once it has been reviewed and approved by a project maintainer.

### Contact
For questions or feedback, please reach out via email at shazanrizvi80@gmail.com.

![Quickslip](https://github.com/ShazanRizvi/QuickSlip/assets/85864291/c514e718-9204-4642-9278-cae53855a78f)
