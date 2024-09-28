import os
import logging
from langchain_groq import ChatGroq
from crewai import Agent, Task, Crew, Process
from dotenv import load_dotenv
from textwrap import dedent
from helper import to_json
load_dotenv()
# Load the LLM with the correct API key
llm = ChatGroq(model="llama-3.1-70b-versatile", api_key=os.getenv('GROQ_API_KEY'))



def score_reviews(data):
    """ Score the reviews based on the sentiment
    Args:
        data: The JSON data
    Returns:
        scored_reviews: CrewAI Output object with the scored reviews
    """
    # Define the agent
    logging.info("Initiating the crew")
    agent = Agent(
        role="csv_agent",
        goal="Read the reviews and provide a score for each review",
        backstory="I am a professional reviewer that can read and score reviews accurately",
        verbose=True,
        llm=llm
    )

    # Define the task
    task = Task(
        description=dedent(f"""
            You are a Linguistic Expert that scrores reviews based on the sentiment try to be more precise by using float values.
            The input is in a JSON file format and is the sentiment analysis of customer reviews.
            input = [
                {{
                    "review": "The review"
                }},
                {{
                    "review": "The review"
                }},...
            ]
            Input data: {data}

            NOTE:- The output is a JSON format with the review and the score.
            Answer Template:
                "review": "The review",
                "score": {{
                    "positive": score,
                    "negative": score,
                    "neutral": score
                }}
        """),
        expected_output="Output is a JSON format with each review and the score",
        agent=agent,
    
    )

    # Define the crew, wrap agents and tasks in lists
    csv_crew = Crew(
        agents=[agent],  
        tasks=[task],    
        process=Process.sequential
    )

    # Run the crew
    result = csv_crew.kickoff()
    logging.info("Crew executed successfully!")
    return result







