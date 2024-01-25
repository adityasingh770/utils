#### Getter & Setter function to retrieve a value/object in a nested/non-nested dict
```
def get_dict_value(d, keys, default=None):
    """
    Recursively retrieves a value from a nested dictionary based on a list of keys.

    Parameters:
    - d (dict): The dictionary to traverse.
    - keys (list): List of keys representing the path to the desired value.
    - default: (optional) Default value to return if the keys are not found.

    Returns:
    - The value located at the specified path in the dictionary, or the default value if not found.
    """
    current = None
    remainingKeys = []

    if d and keys:
        k = keys[0]
        current = d.get(k) if type(d) is dict else d[k] if type(d) is list else None
        remainingKeys = keys[1:]

    if current:
        if remainingKeys:
            return get_dict_value(current, remainingKeys, default)
        return current
    return default
```
```
def set_dict_value(d, keys, value):
    """
    Sets a value within a nested dictionary based on a list of keys.

    Parameters:
    - d (dict): The dictionary to update.
    - keys (list): List of keys representing the path where the value should be set.
    - value: The value to set at the specified path.

    Example:
    set_dict_value(my_dict, ['first', 'second', 'third'], 42)
    This will set the value 42 at my_dict['first']['second']['third'].

    Note:
    If intermediate keys do not exist, they will be created as empty dictionaries.

    Returns:
    None
    """
    for key in keys[:-1]:
        d = d.setdefault(key, {})
    d[keys[-1]] = value
```