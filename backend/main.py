import math
from typing import List, Optional, Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="KTU CSD415 & CSD416 Academic Course API",
    description="Backend microservice supporting interactive laboratories, numerical calculations, and dataset pipelines for KTU Project Phase I & II.",
    version="1.0.0"
)

# Enable CORS for local Vite and production frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Data Models ---
class ConfusionMatrixInput(BaseModel):
    tp: int = Field(..., ge=0, example=45)
    fp: int = Field(..., ge=0, example=15)
    fn: int = Field(..., ge=0, example=5)
    tn: int = Field(..., ge=0, example=435)

class ConfusionMatrixOutput(BaseModel):
    total_samples: int
    accuracy: float
    precision: float
    recall: float
    specificity: float
    f1_score: float
    mcc: float
    interpretation: str

class RegressionInput(BaseModel):
    actuals: List[float] = Field(..., example=[24.5, 31.0, 42.8, 18.2, 55.4])
    predictions: List[float] = Field(..., example=[22.1, 33.5, 40.2, 19.8, 51.0])

class RegressionOutput(BaseModel):
    n_points: int
    mae: float
    mse: float
    rmse: float
    r2_score: float
    interpretation: str

class CPMTask(BaseModel):
    id: str
    name: str
    duration: float
    predecessors: List[str] = []

class CPMRequest(BaseModel):
    tasks: List[CPMTask]

# --- Endpoints ---

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "KTU Project Phase I & II Microservice Engine",
        "author": "Jane Rose | Department of Computer Science & Engineering",
        "supported_courses": ["CSD415", "CSD416"]
    }

@app.post("/api/metrics/confusion-matrix", response_model=ConfusionMatrixOutput)
def calculate_confusion_matrix(data: ConfusionMatrixInput):
    tp, fp, fn, tn = data.tp, data.fp, data.fn, data.tn
    total = tp + fp + fn + tn

    if total == 0:
        raise HTTPException(status_code=400, detail="Total samples must be greater than zero.")

    acc = (tp + tn) / total
    prec = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    rec = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    spec = tn / (tn + fp) if (tn + fp) > 0 else 0.0
    f1 = (2 * prec * rec) / (prec + rec) if (prec + rec) > 0 else 0.0

    mcc_denom = math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn))
    mcc = ((tp * tn) - (fp * fn)) / mcc_denom if mcc_denom > 0 else 0.0

    interpretation = (
        f"Evaluated on N={total} cases. Model exhibits strong sensitivity (Recall={rec*100:.1f}%) "
        f"and specificity ({spec*100:.1f}%). Harmonic F1-Score of {f1*100:.1f}% confirms balanced performance "
        f"under class imbalance."
    )

    return {
        "total_samples": total,
        "accuracy": round(acc, 4),
        "precision": round(prec, 4),
        "recall": round(rec, 4),
        "specificity": round(spec, 4),
        "f1_score": round(f1, 4),
        "mcc": round(mcc, 4),
        "interpretation": interpretation
    }

@app.post("/api/metrics/regression", response_model=RegressionOutput)
def calculate_regression_metrics(data: RegressionInput):
    actuals = data.actuals
    preds = data.predictions
    n = min(len(actuals), len(preds))

    if n == 0:
        raise HTTPException(status_code=400, detail="Arrays must contain at least one valid numerical point.")

    errors = [a - p for a, p in zip(actuals[:n], preds[:n])]
    mae = sum(abs(e) for e in errors) / n
    mse = sum(e ** 2 for e in errors) / n
    rmse = math.sqrt(mse)

    mean_actual = sum(actuals[:n]) / n
    ss_tot = sum((a - mean_actual) ** 2 for a in actuals[:n])
    ss_res = sum(e ** 2 for e in errors)
    r2 = 1.0 - (ss_res / ss_tot) if ss_tot > 0 else 0.0

    return {
        "n_points": n,
        "mae": round(mae, 4),
        "mse": round(mse, 4),
        "rmse": round(rmse, 4),
        "r2_score": round(r2, 4),
        "interpretation": f"Model explains {r2*100:.2f}% of target variance with an average RMSE deviation of {rmse:.3f} units."
    }

@app.post("/api/cpm/calculate")
def calculate_cpm(req: CPMRequest):
    tasks_dict = {t.id: {"id": t.id, "name": t.name, "d": t.duration, "pred": t.predecessors} for t in req.tasks}

    # Forward Pass
    for t_id, t_data in tasks_dict.items():
        es = max([tasks_dict[p]["ef"] for p in t_data["pred"]]) if t_data["pred"] else 0.0
        t_data["es"] = es
        t_data["ef"] = es + t_data["d"]

    project_duration = max([t["ef"] for t in tasks_dict.values()]) if tasks_dict else 0.0

    # Backward Pass
    for t_id in reversed(list(tasks_dict.keys())):
        succ = [k for k, v in tasks_dict.items() if t_id in v["pred"]]
        lf = min([tasks_dict[s]["ls"] for s in succ]) if succ else project_duration
        tasks_dict[t_id]["lf"] = lf
        tasks_dict[t_id]["ls"] = lf - tasks_dict[t_id]["d"]
        tasks_dict[t_id]["slack"] = tasks_dict[t_id]["ls"] - tasks_dict[t_id]["es"]
        tasks_dict[t_id]["is_critical"] = (tasks_dict[t_id]["slack"] == 0.0)

    critical_path = [t["id"] for t in tasks_dict.values() if t["is_critical"]]

    return {
        "project_duration_weeks": project_duration,
        "critical_path": critical_path,
        "schedule": list(tasks_dict.values())
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

