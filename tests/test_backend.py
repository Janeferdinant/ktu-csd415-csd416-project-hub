import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))
from main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "Jane Rose" in data["author"]

def test_confusion_matrix_calculation():
    payload = {"tp": 45, "fp": 15, "fn": 5, "tn": 435}
    response = client.post("/api/metrics/confusion-matrix", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["total_samples"] == 500
    assert data["accuracy"] == 0.96
    assert data["precision"] == 0.75
    assert data["recall"] == 0.90
    assert data["f1_score"] == 0.8182
    assert data["mcc"] == 0.8001

def test_regression_calculation():
    payload = {
        "actuals": [24.5, 31.0, 42.8, 18.2, 55.4],
        "predictions": [22.1, 33.5, 40.2, 19.8, 51.0]
    }
    response = client.post("/api/metrics/regression", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["n_points"] == 5
    assert data["mae"] == 2.7
    assert data["mse"] == 8.138
    assert data["rmse"] == 2.8527
    assert data["r2_score"] == 0.9539

def test_cpm_scheduling():
    payload = {
        "tasks": [
            {"id": "A", "name": "Lit Survey", "duration": 4, "predecessors": []},
            {"id": "B", "name": "Problem Form", "duration": 3, "predecessors": ["A"]},
            {"id": "C", "name": "Dataset Curation", "duration": 6, "predecessors": ["A"]},
            {"id": "D", "name": "System Arch", "duration": 4, "predecessors": ["B", "C"]},
            {"id": "E", "name": "Report", "duration": 2, "predecessors": ["D"]}
        ]
    }
    response = client.post("/api/cpm/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["project_duration_weeks"] == 16.0
    assert data["critical_path"] == ["A", "C", "D", "E"]

if __name__ == "__main__":
    test_health()
    test_confusion_matrix_calculation()
    test_regression_calculation()
    test_cpm_scheduling()
    print("All Python backend unit tests PASSED successfully!")

