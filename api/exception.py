from fastapi import HTTPException

class UserNotRegisteredError(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="User not registered")


class IncorrectPasswordError(HTTPException):
    def __init__(self):
        super().__init__(status_code=401, detail="Incorrect password")


class TranslationError(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Error when translating")