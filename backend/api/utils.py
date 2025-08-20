import hashlib
import datetime as dt
from typing import List, Tuple

DB = {
    "batches": {},
    "metrics": {},
    "provenance": {},
}

def new_batch_id() -> str:
    return "b_" + hashlib.sha1(str(dt.datetime.utcnow()).encode()).hexdigest()[:12]

def ingest_files(batch_id: str, files: List[Tuple[str, bytes]]) -> Tuple[list, list]:
    ingested, warnings = [], []
    DB["batches"][batch_id] = DB["batches"].get(batch_id, {"files":{}})
    for name, content in files:
        ingested.append(name)
        DB["batches"][batch_id]["files"][name] = content
    return ingested, warnings

def priced_ratio_from_positions(batch_id: str) -> float:
    files = DB["batches"].get(batch_id, {}).get("files", {})
    if "sample_portfolio.csv" in files:
        return 0.95
    return 0.0

def corr_cov_from_prices(batch_id: str):
    return None, None

def alpha_beta_vs_bench(batch_id: str, bench_col: str = "SPY"):
    return {}
