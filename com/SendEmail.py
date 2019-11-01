from flask import Flask,render_template
from flask_mail import Mail,Message
import json
import pymongo

app=Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'vimalsiva9519@gmail.com'
app.config['MAIL_PASSWORD'] = 'vimal478'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail=Mail(app)

client = pymongo.MongoClient("localhost:27017")
db= client["TestDB"]
col = db["Employee"]


@app.route("/")
def sendmsgbody():
    
    try:
        msg = Message('SkedlerMail',sender="vimalsiva9519@gmail.com",recipients=["vimal@guidanz.com"])
        msg.body="Hi, This is the Email verification mail from skedler.com "
        mail.send(msg)
        return "Mail sent successfully"
    except Exception:
        return(str(Exception))

@app.route("/sendhtml")
def validateEmail():
    
    try:
        msg = Message('SkedlerMail',sender="vimalsiva9519@gmail.com",recipients=["vimal@guidanz.com"])
        msg.body="Hi, This is the Email verification mail from skedler.com "
        msg.html=render_template('EmailValidation.html',mailID=msg.recipients)
        mail.send(msg)
        print("mail new test sent")
        return "Mail sent successfully"
    except Exception as e:
        return "Mail sent failed"
        
        
@app.route("/register")
def registrationSuccess():
    
    try:
        msg = Message('SkedlerMail',sender="vimalsiva9519@gmail.com",recipients=["vimal@guidanz.com"])
        msg.body="Hi, Registration Success Email"
        msg.html=render_template('RegistrationSuccess.html')
        mail.send(msg)
        return "Mail sent successfully"
    except:
        return "Mail sent failed"
    
    
    
if __name__ == '__main__':
    app.run(debug=True)
    
    
    