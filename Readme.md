# Sentiment Analysis of Customer Reviews

This project implements sentiment analysis for customer reviews using Groq LLMs. The project is structured into two main components: a backend service implemented with Python's Poetry (located in the `review_scorer` folder) and a frontend application built using NestJS (located in the `frontend` folder).

Demo :-(Video is fast forwarded to 1.8x) 

https://github.com/user-attachments/assets/d2fe5012-bb67-4cb2-8e07-e315c0a520d4

## Table of Contents

- [Installation](#installation)
- [Backend](#backend)
  - [Getting Started](#getting-started)
  - [API Endpoints](#api-endpoints)
  - [Input and Output Format](#input-and-output-format)
  - [Configuration](#configuration)
- [Frontend](#frontend)
  - [Getting Started](#getting-started-1)
  - [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#Contact)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/pravincoder/Sentiment_Analysis.git
    ```
2. Navigate to the backend folder and install dependencies:

    ```bash
    cd review_scorer
    poetry install
    ```
3. Navigate to the frontend folder and install dependencies:

    ```bash
    cd frontend
    npm install
    ```
## Backend

### Getting Started

1. Navigate to the backend directory:

   ```bash
   cd review_scorer
    ```
2. Activate the Poetry virtual environment:
    ```bash
    poetry shell
    ```
3. Start the backend server:
    ```bash
    python app.py
    ```


### API Endpoints
 
- **POST /score_reviews**
    File (required):- A ```csv``` or ```xlsx``` file path

### Input and Output Format

- Input:
    -The input file can be in CSV or XLSX format.
- Output:
    -The output is a JSON object containing the sentiment analysis for each review in the input file.

### Configuration

**Use the ```Sample.env``` as your ```.env``` by renaming and Get the Groq API key from the Groq Webpage**
*Langchain key is optional*

    ```bash
    GROQ_API_KEY=your_groq_api_key
    ```
## Frontend

### Getting Started

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Start the frontend server:
    ```bash
    npm run start
    ```

3. Open your browser and navigate to ```http://localhost:3000``` , make sure your backend is running in different terminal .

### Usage
- The frontend application allows users to upload a CSV or XLSX file containing customer reviews for sentiment analysis.
  
**(Make sure the xlsx or csv has a review or Review column.)**

- After uploading the file, click the "Analyze" button to see the sentiment scores and analysis results displayed.

### Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature/YourFeature).
6. Open a Pull Request.

# Contact

If you have any questions, suggestions, or would like to collaborate, feel free to reach out:

- **Email:📧** [PravinCoder](pravincoder@gmail.com)
- **Linkedin:🔗** [PravinCoder](https://www.linkedin.com/in/pravincoder/)

I'm always open to discussing new projects, ideas, or opportunities!
