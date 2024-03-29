from flask import Flask, request, jsonify
from flask_cors import CORS
#import tensorflow as tf
from prophet import Prophet 
from bcnTrams import cargar_datos
from datetime import timedelta,datetime
#from tensorflow.keras.models import load_model
#from sklearn.preprocessing import StandardScaler
#import joblib
import pickle
import datetime
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

'''# Cargar el modelo de árboles de decisión desde el archivo pickle
with open("python/ML/models/2024-02-26_151721-decisionTree.pkl", 'rb') as file:
    model = pickle.load(file)'''

# Cargar el modelo Prophet desde el archivo pickle
with open("python/ML/models/modelos_prophet.pkl", 'rb') as file:
    model = pickle.load(file)
    
#model = load_model('python/ML/models/2024-02-23_081116-cnns.keras')
#scaler=joblib.load('python/ML/models/scaler.joblib')

@app.route('/datos', methods=['GET'])
def obtener_datos():
    # Carga los datos
    datos = cargar_datos()

    # Convierte los datos a JSON
    respuesta = jsonify(datos)

    # Retorna la respuesta
    return respuesta

@app.route('/predict', methods=['POST'])
def predecir_estado_trafico():
    
    def roundFiveMin(df):
        df['data'] = df['data'].dt.round(freq='5min')
        df['data'] = df['data']
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
    
    def predecir24hs(idTram,model,hora_prediccion):
        fecha_inicio = hora_prediccion
        fecha_fin = pd.to_datetime(fecha_inicio+datetime.timedelta(minutes=60), format='%Y%m%d%H%M%S')
        rango_fechas = pd.date_range(start=fecha_inicio, end=fecha_fin, freq='h')
        
        futuro = pd.DataFrame({'ds': rango_fechas, 'y': np.nan})
        
        for element in model:
            if int(idTram) == int(element[0]):
                futuro=element[1].predict(futuro)
                futuro['yhat']=futuro['yhat'].round()
                return int(futuro['yhat'][1])
        
    try:
        data = request.get_json()
        data = data['data']
        # Obtener los valores de idTram y estatActual del cuerpo de la solicitud JSON (la hora se toma como la de la consulta)        
        
        hora_prediccion = pd.to_datetime(datetime.datetime.now(), format='%Y%m%d%H%M%S')
        
        new_data=[]
        for element in data:
            new_data.append({
                "id": element['id'],
                "address": element['address'],
                "lines": element['lines'],
                "status": element['status'],
                "prediction": predecir24hs(element['id'],model,hora_prediccion)
            })
        
        return new_data

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)