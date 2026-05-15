import pandas as pd
from sqlalchemy import create_engine
import dotenv
import os
import json
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import time
import atexit
from flask import Flask
from threading import Thread

dotenv.load_dotenv()

EXPORT_FILE = "KEMRI_Questionnaire_Export.xlsx"
LAST_EXPORT_FILE = ".last_export.json"

def get_last_export_time():
    """Retrieve the timestamp of the last export."""
    try:
        if os.path.exists(LAST_EXPORT_FILE):
            with open(LAST_EXPORT_FILE, 'r') as f:
                data = json.load(f)
                return data.get('last_export_time')
    except Exception as e:
        print(f"Warning: Could not read last export time: {e}")
    return None

def save_export_time():
    """Save the current timestamp as the last export time."""
    try:
        with open(LAST_EXPORT_FILE, 'w') as f:
            json.dump({
                'last_export_time': datetime.now().isoformat(),
                'file_name': EXPORT_FILE
            }, f)
    except Exception as e:
        print(f"Warning: Could not save export time: {e}")

def export_questionnaire_data():
    """Fetch all records from database and export to Excel."""
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '3306')
    DB_NAME = os.getenv('DB_NAME', 'railway')

    connection_string = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    
    try:
        engine = create_engine(connection_string)

        query = "SELECT * FROM responses ORDER BY questionnairesno DESC"

        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Fetching data from MySQL...")
        df = pd.read_sql(query, engine)

        if df.empty:
            print("No records found in database.")
            return

        if 'older_siblings' in df.columns:
            df['older_siblings'] = df['older_siblings'].map({1: 'Yes', 0: 'No'})

        df.to_excel(EXPORT_FILE, index=False, engine='openpyxl')
        save_export_time()

        print(f"Success! Data exported to {EXPORT_FILE}")
        print(f"Total records exported: {len(df)}")
        print(f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    except Exception as e:
        print(f"Error during export: {str(e)}")

def scheduled_export():
    """Wrapper for scheduled exports with logging."""
    print("\n" + "="*60)
    print(f"🔄 Running scheduled export job at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*60)
    export_questionnaire_data()

def start_scheduler():
    """Start the APScheduler to run export once daily."""
    scheduler = BackgroundScheduler()
    
    
    scheduler.add_job(
        func=scheduled_export,
        trigger="cron",
        hour=2,
        minute=0,
        id='daily_export',
        name='Daily Questionnaire Export',
        replace_existing=True
    )
    
    scheduler.start()
    print(f"✓ Scheduler started. Export will run daily at 02:00 UTC")
    print(f"✓ Current time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    atexit.register(lambda: scheduler.shutdown())
    
    return scheduler

def start_web_server():
    """Start a simple Flask web server to keep the app running on Render."""
    app = Flask(__name__)
    
    @app.route('/')
    def health():
        return {'status': 'running', 'service': 'KEMRI Data Export'}, 200
    
    @app.route('/export', methods=['POST'])
    def trigger_export():
        """Manual endpoint to trigger export."""
        export_questionnaire_data()
        return {'status': 'export completed'}, 200
    
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

if __name__ == "__main__":
    print("Starting KEMRI Data Export Service...")
    export_questionnaire_data()
    
    scheduler = start_scheduler()
    
    web_thread = Thread(target=start_web_server, daemon=True)
    web_thread.start()
    print("✓ Web server started")
    
    try:
        while True:
            time.sleep(600) 
    except KeyboardInterrupt:
        print("\n✓ Scheduler stopped by user")
        scheduler.shutdown()