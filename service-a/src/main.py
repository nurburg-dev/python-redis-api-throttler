from fastapi import FastAPI
from typing import Dict

app = FastAPI(title="Service A", version="1.0.0")

@app.get("/health")
async def health_check() -> Dict[str, str]:
    return {"status": "healthy", "service": "service-a"}

@app.get("/")
async def root() -> Dict[str, str]:
    return {"message": "Hello from Service A", "service": "service-a"}

@app.get("/{path:path}")
async def catch_all(path: str) -> Dict[str, str]:
    return {"message": f"Service A received request for: {path}", "service": "service-a"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)