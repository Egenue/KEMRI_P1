import pandas as pd
from sqlalchemy import create_engine
import dotenv
import os

# 1. Load environment variables (ensure your .env file is in the same folder)
dotenv.load_dotenv()

def export_questionnaire_data():
    # Railway connection string format: mysql+pymysql://user:password@host:port/database
    # Replace these variables with your actual Railway credentials
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '3306')
    DB_NAME = os.getenv('DB_NAME', 'railway')

    connection_string = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    
    try:
        # 2. Create Database Engine
        engine = create_engine(connection_string)

        # 3. Define the SQL Query
        query = "SELECT * FROM responses"

        print("Fetching data from MySQL...")
        df = pd.read_sql(query, engine)

        # 4. Data Cleaning (Optional but helpful for statistics)
        # Convert 1/0 to Yes/No for better readability in Excel if desired
        df['older_siblings'] = df['older_siblings'].map({1: 'Yes', 0: 'No'})

        # 5. Export to Excel
        file_name = "KEMRI_Questionnaire_Export.xlsx"
        df.to_excel(file_name, index=False, engine='openpyxl')

        print(f"✅ Success! Data exported to {file_name}")
        print(f"Total records exported: {len(df)}")

    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    export_questionnaire_data()