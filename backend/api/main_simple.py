from fastapi import FastAPI

app = FastAPI(title="Portfolio X-Ray Pro API")

@app.get("/health")
def health_check():
    return {"status": "healthy"}
