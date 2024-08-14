import json
import sqlalchemy
from sqlalchemy.types import TypeDecorator,VARCHAR



class TextPickleType(TypeDecorator):
    """https://docs.sqlalchemy.org/en/14/orm/extensions/mutable.html#establishing-mutability-on-scalar-column-values
       https://stackoverflow.com/questions/1378325/python-dicts-in-sqlalchemy
    """

    impl = VARCHAR

    def process_bind_param(self, value, dialect):
        if value is not None:
            value = json.dumps(value)

        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            value = json.loads(value)
        return value