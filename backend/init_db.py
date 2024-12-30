import sqlite3
from pathlib import Path

def init_db():
    db_path = Path(__file__).parent / "data" / "recipes.db"
    db_path.parent.mkdir(parents=True, exist_ok=True)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    
    schema_path = Path(__file__).parent / "schema.sql"
    with open(schema_path, 'r') as f:
        sql_script = f.read()
    
    
    cursor.executescript(sql_script)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()