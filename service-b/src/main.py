from fastapi import FastAPI
from typing import Dict

app = FastAPI(title="Service B", version="1.0.0")

@app.get("/health")
async def health_check() -> Dict[str, str]:
    return {"status": "healthy", "service": "service-b"}

@app.get("/")
async def root() -> Dict[str, str]:
    return {"message": "Hello from Service B", "service": "service-b"}

@app.get("/{path:path}")
async def catch_all(path: str) -> Dict[str, str]:
    return {"message": f"Service B received request for: {path}", "service": "service-b"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)