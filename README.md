Environment Variables
To run the server, you need to configure some environment variables. These variables store important settings such as your database connection string, encryption secrets, and server configuration. Below is an example of the required environment variables that should be included in a .env file in the root directory of the project.

## Setting Up Environment Variables

Before running the server, you need to set up your environment variables. Follow these steps:

1. Create a `.env` file in the root directory of the project.
2. Copy the contents of `.env.example` into your `.env` file.
3. Replace the placeholder values (`your_database_url_here`, `your_salt_round_value_here`, `your_jwt_secret_here`, etc.) with your actual credentials.

Example `.env` file:

```bash
NODE_ENV=development
DATABASE_URL=your_database_url_here
PORT=4000
BCRYPT_SALT_ROUND=your_salt_round_value_here
JWT_ACCESS_TOKEN_SECRET=your_jwt_secret_here
JWT_ACCESS_EXPIRES_IN=3d
