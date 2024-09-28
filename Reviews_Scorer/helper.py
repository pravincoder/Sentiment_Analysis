import re

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
    # Remove special characters
    data=data.map(lambda x: re.sub(r'[^\x00-\x7F]+',' ', x))
    # Remove leading and trailing whitespaces
    data=data.map(lambda x: x.strip() if isinstance(x, str) else x)

    # Set the data to review  or Review column which ever is present
    if 'review' in data.columns:
        data = data['review']
    elif 'Review' in data.columns:
        data = data['Review']
    else:
        raise ValueError("No column named 'review' or 'Review' found in the data")    
    
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
    return json_data