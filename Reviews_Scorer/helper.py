import re
import logging
import pandas as pd
import json
from typing import Any
from crewai.tasks.output_format import OutputFormat

def clean_data(data):
    """Clean the data and return the cleaned data
    Args:
        Data: Data of csv/xlsx format
    Returns:
        Cleaned_data: The cleaned data
    """
    # Remove duplicates and NaN values
    data=data.dropna()
    data=data.drop_duplicates()
    logging.info("Data removed duplicates and NaN values if any")
    # Remove special characters
    data=data.map(lambda x: re.sub(r'[^\x00-\x7F]+',' ', x))
    logging.info("Data removed special Char if any")
    # Remove leading and trailing whitespaces
    data=data.map(lambda x: x.strip() if isinstance(x, str) else x)
    logging.info("Data removed leading and trailing whitespaces")
    return data


def to_json(file):
    """ Convert the file to JSON
    Args:
        File: The path to the file
    Returns:
        Json_data: The converted data into Json Format 
    """
    cleaned_data = clean_data(file)
    json_data = cleaned_data.to_json(orient='records')
    logging.info("Data converted to JSON format")
    return json_data
