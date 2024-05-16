from fastapi.testclient import TestClient
from main import app


def test_read_highlights():
    expected_response = {"message": "Hello World"}

    client = TestClient(app)
    response = client.get("/")
    json_response = response.json()

    assert response.status_code == 200
    assert expected_response == json_response
