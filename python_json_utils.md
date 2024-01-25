#### Overriding Python json.dumps()
```
class JSONSetEncoder(json.JSONEncoder):
	def default(self, obj):
    """
    Custom method for JSON serialization.

    This method is used as part of the JSONSetEncoder class, which inherits from json.JSONEncoder.
    It provides custom serialization logic for objects that are not natively serializable to JSON.

    Parameters:
    - obj: Any
        The object to be serialized.

    Returns:
    - JSON-serializable representation of the object.

    If the object is a set, it converts it to a list using the `list()` function before proceeding
    with the JSON serialization. For other types of objects, it falls back to the default
    serialization behavior of json.JSONEncoder.

    Note: This method is designed to work specifically with sets, ensuring they are properly
    converted to lists during the JSON serialization process.
    """
    if isinstance(obj, set):
        return list(obj)
    return json.JSONEncoder.default(self, obj)
```
```
class PydanticJSONEncoder(json.JSONEncoder):
	def default(self, obj):
		"""
		Custom method for JSON serialization.

		This method is used as part of the PydanticJSONEncoder class, which inherits from json.JSONEncoder.
		It provides custom serialization logic for objects that are not natively serializable to JSON.

		Parameters:
		- obj: Any
			The object to be serialized.

		Returns:
		- JSON-serializable representation of the object.

		If the object is a Pydantic BaseModel, it converts it to a JSON-formatted string using the
		`json()` method of the Pydantic BaseModel and then deserializes it back to a Python object
		using `json.loads()`. For other types of objects, it falls back to the default serialization
		behavior of json.JSONEncoder.

		Note: This method is designed to work specifically with Pydantic BaseModel instances.
		"""
		if isinstance(obj, BaseModel):
			return json.loads(obj.json())
		return super().default(obj)
```