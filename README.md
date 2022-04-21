# Said.it

Said.it is a pretty straight-forward Reddit clone, with a small addition of a text to speech button for Post titles and for user Comments. Logged in users can create communities and create posts inside individual communities. Users must also be logged in to leave comments and votes. Non logged in users have the ability to access communities and see posts, but cannot interact unless logged in.

I chose Reddit as it seems like a good way to test design concepts from the standpoint of authorized users and non authorized users. Along with many different functionality concepts to implement.


# Features
 * Account creation, sign in, and demo user function.
 * Can create, read, update, and delete the following:
   * Communities
   * Posts
   * Comments
 * Upvote system

Future features:
   * AWS support
   * Search functionality
   * Web sockets for messaging

# Technologies used
  * React
  * Redux
  * Flask
  * SQLAlchemy
  * PostgreSQL

***


# Splash / Home page

From the home page users can access the site as a normal logged in user would, just without the ability to create anything. Here you can access the buttons for text to speech for post titles.

![splash](https://user-images.githubusercontent.com/94084333/164514945-af199a86-de76-467c-803f-ad99ca3488b7.PNG)

# Creating / Viewing Communities

From the home page users can create a new community or click on an existing one to view the specific community.

![create-com](https://user-images.githubusercontent.com/94084333/164514974-9734e9cf-5852-49bd-a47c-0f00002aae10.PNG)
![view-com](https://user-images.githubusercontent.com/94084333/164514982-eac6e959-b366-40a6-a0fc-ab3c951b05fe.PNG)

# Creating / Viewing Posts & Comments

When clicking on an individual post users will be able to read the post in its entirety as well as leave comments, or votes like normal. Here you can also access the text to speech for comments as well as post titles.

![create-post](https://user-images.githubusercontent.com/94084333/164515027-ca25e20f-96ad-4f75-8273-1320998f1305.PNG)
![view-post](https://user-images.githubusercontent.com/94084333/164515036-056b60ed-dc72-4c7a-82a1-d72f52077b5a.PNG)


***

## Getting started
### Dev Containers (M1 Users, follow this guide)

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. 
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. 
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```
4. Open the repo in VS Code. 
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner. 
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app. 

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br>

### Standard (Traditional)

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |

## Deploy to Heroku

### Abstract
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations. 

### Writing your Dockerfile
In order for the Github action to work effectively, it must have a configured docker file. In order to effectively deploy your site you need to code out the notes found in this [docker file](./Dockerfile)

### Configuring Production Environment Variables 

1. In your Heroku app settings you should have two environment variables set. 

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

2. In your Github Actions Secrets you should have two environment variables set. You can find this webpage at the following address: *github.com/userID/repoName/settings/secrets/actions*

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token |
   | `HEROKU_APP_NAME` | Heroku app name    |

3. To get an Oauth token for Heroku, run the following command in your terminal already authenticated to the Heroku CLI and pull out the string on the Token key. 
   ```bash
   heroku authorizations:create 
   ```
