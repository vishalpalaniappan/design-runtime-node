import sys
import json
import os
import logging
import uuid
from pathlib import Path
from clp_logging.handlers import ClpKeyValuePairStreamHandler

ADLI_EXECUTION_ID = str(uuid.uuid4())

path = Path(os.getcwd()) / f"{ADLI_EXECUTION_ID}.clp.zst"
clp_handler = ClpKeyValuePairStreamHandler(open(path, "wb"))
logger = logging.getLogger("design_runtime_log_sink")
logger.setLevel(logging.INFO)
logger.addHandler(clp_handler)

for line in sys.stdin:
    try:
        event = json.loads(line)
        logger.info(event)
    except Exception as e:
        print(f"LOG_SINK_ERROR: {e}", file=sys.stderr)

clp_handler.close()