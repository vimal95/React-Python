from flask import Flask, render_template, request
from flask_mail import Mail,Message
from flask_cors import CORS,cross_origin
from flask_swagger_ui import get_swaggerui_blueprint
import json
import pymongo

app=Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = '******'
app.config['MAIL_PASSWORD'] = '*******'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail=Mail(app)

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "FlaskTest"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)

# Js = json.loads(open("config.json").read())
# print(Js['subject'],Js['sender'],Js['recipients'])
test_value2 = None

client = pymongo.MongoClient("mongodb+srv://somesh:bkiQZUBxbpx3IGvm@cluster0-xsksy.mongodb.net/test?retryWrites=true&w=majority")
#db = client.test
#client = pymongo.MongoClient("localhost:27017")
db= client["TestDB"]
col = db["Employee"]

@app.route('/vimal',methods=['POST','OPTIONS'])
@cross_origin(origin='*')
def Downloadsuccess():
    
    global test_value2
    if request.method=='POST':
        Template = request.json['user']
        id_test=Template['id']
        print(Template)
        print(type(Template))
        print(type(id_test))
        col.insert_one(Template)
        test_value2 = id_test
        return id_test
     
@app.route('/thankyou',methods=['POST','OPTIONS'])
@cross_origin(origin='*')
def thankyou():
    print("somethingggggggg")
    try:
        if request.method=='POST':
            print("yesssssssssssss")
            data=col.find({'id': 'Thankyou'})
            print(data)
            print(type(data))
            for x in data:
                print(x)
                c=x['name']
                print(c)
            
            senderEmail=request.json['SenderEmail']
            print(senderEmail)
            receiverEmail=request.json['receiverEmail']
            print(receiverEmail)
            msg = Message("SkedlerMail",sender=senderEmail,recipients=[receiverEmail])
            msg.html="<div style=border:groove;>"+ c +"</div>"
            mail.send(msg)
            
    
        return "Mail sent successfully"
    except Exception:
        return Exception
    
    
@app.route('/releaseNotes',methods=['POST','OPTIONS'])
@cross_origin(origin='*')
def releaseNotes():
    print("somethingggggggg")
    try:
        if request.method=='POST':
            print("yesssssssssssss")
            data=col.find({'id': 'ReleaseNotes'})
            print(data)
            print(type(data))
            for x in data:
                print(x)
                c=x['name']
                print(c)
            
            senderEmail=request.json['SenderEmail']
            print(senderEmail)
            receiverEmail=request.json['receiverEmail']
            print(receiverEmail)
            msg = Message("SkedlerMail",sender=senderEmail,recipients=[receiverEmail])
            msg.html="<div style=border:groove;>"+ c +"</div>"
            mail.send(msg)
            
    
        return "Mail sent successfully"
    except Exception:
        return Exception
    
    
@app.route('/Download',methods=['POST','OPTIONS'])
@cross_origin(origin='*')
def Download():
    print("somethingggggggg")
    try:
        if request.method=='POST':
            print("yesssssssssssss")
            data=col.find({'id': 'Download'})
            print(data)
            print(type(data))
            for x in data:
                print(x)
                c=x['name']
                print(c)
            senderEmail=request.json['SenderEmail']
            print(senderEmail)
            receiverEmail=request.json['receiverEmail']
            print(receiverEmail)
            msg = Message("SkedlerMail",sender=senderEmail,recipients=[receiverEmail])
            msg.html="<div style=border:groove;>"+ c +"</div>"
            mail.send(msg)
            
    
        return "Mail sent successfully"
    except Exception:
        return Exception
    
if __name__ == '__main__':
    app.run(port=5003,debug=True)
    
    
    