from pydantic import BaseModel
from typing import List, Optional, Dict

class UploadResponse(BaseModel):
    batch_id: str
    files_ingested: List[str]
    warnings: List[str] = []

class TransparencyScoreResponse(BaseModel):
    batch_id: str
    score: float
    priced_ratio: float
    reconciled_ratio: float
    mapped_ratio: float

class ProvenanceInput(BaseModel):
    file: str
    rows_used: int

class ProvenanceResponse(BaseModel):
    metric: str
    inputs: List[ProvenanceInput]
    calculation: str

class ReportRequest(BaseModel):
    batch_id: str
    client: str
    advisor: str
    as_of: Optional[str] = None
