import requests
import os
import time
import json
from datetime import datetime

url = os.getenv("SITE_URL")

start = time.time()
response = requests.get(url)
latency = (time.time() - start) * 1000  # ms

metrics = {
    "url": url,
    "status": response.status_code,
    "latency_ms": round(latency, 2),
    "content_length": len(response.content),
    "timestamp": datetime.utcnow().isoformat() + "Z"
}

print(json.dumps(metrics, indent=2))

with open("metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)