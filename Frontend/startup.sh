#!/bin/sh

# Print the URL message to the console
echo "The application is running and can be accessed at http://localhost:3000/invoicegenerator"

# Start the serve command
npx serve -s dist -l 3000
