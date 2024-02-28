from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
#from tensorflow.keras.models import load_model
#from sklearn.preprocessing import StandardScaler
#import joblib
import pickle
import datetime
import pandas as pd

app = Flask(__name__)
CORS(app)

# Cargar el modelo de árboles de decisión desde el archivo pickle
with open("python/ML/models/2024-02-26_151721-decisionTree.pkl", 'rb') as file:
    model = pickle.load(file)

#model = load_model('python/ML/models/2024-02-23_081116-cnns.keras')
#scaler=joblib.load('python/ML/models/scaler.joblib')

@app.route('/predict', methods=['POST'])
def predecir_estado_trafico():
    
    def roundFiveMin(df, delta=0):
        df['data'] = df['data'].dt.round(freq='5min')
        df['data'] = df['data']+datetime.timedelta(minutes=delta)
        return df

    def dateTimeSplit(df):     
        df['date'] = df['data'].dt.date
        df['time'] = df['data'].dt.time
        df['year'] = df['data'].dt.year
        df['month'] = df['data'].dt.month
        df['day'] = df['data'].dt.day
        df['hour'] = df['data'].dt.hour
        df['minute'] = df['data'].dt.minute
        df['date'] = pd.to_datetime(df['date'])
        df['weekDay'] = df['date'].dt.weekday
        return df
    try:
        data = request.get_json()
        data = data['data']
        # Obtener los valores de idTram y estatActual del cuerpo de la solicitud JSON (la hora se toma como la de la consulta)        
        
        index = []
        for i in range(len(data)):
            index.append(i)
        
        new_data=[]
        
        for element in data:
            id_tramo = element["id"]
            poligono = element["lines"]
            address = element["address"]
            estado_actual = element["status"]
            hora_prediccion = datetime.datetime.now()
            
            dataFrame=({
                "idTram":id_tramo,
                "data":hora_prediccion
            })
        
            df = pd.DataFrame(dataFrame, index=index)
            
            deltaTime=5
            
            roundFiveMin(df, deltaTime)
            dateTimeSplit(df)
        
            X_pred_nuevo = df[["year", "month", "day", "hour", "minute", "weekDay", "idTram"]]
            #X_pred_nuevo = scaler.transform(X_pred_nuevo)
            #X_pred_nuevo = X_pred_nuevo.reshape((X_pred_nuevo.shape[0],X_pred_nuevo[1],1))
    
            
            # Realizar la predicción con el modelo 
            prediction = model.predict(X_pred_nuevo)
            new_data.append ({
                "id": id_tramo,
                "address": address,
                "lines": poligono,
                "status": estado_actual,
                "prediction": int(prediction[0])
            })
        
        return new_data

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)