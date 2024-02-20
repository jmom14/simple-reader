def json_to_params(json_data):
    params = "&".join(f"{key}={value}" for key, value in json_data.items())
    return params
