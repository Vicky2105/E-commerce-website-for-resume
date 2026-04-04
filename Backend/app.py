from flask import Flask, jsonify, render_template, request
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import(
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
    )
from flask_cors import CORS
app=Flask(__name__)
CORS(app,resources={r"/*": {"origins": "http://localhost:5173"}})
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///students.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config["JWT_SECRET_KEY"]="Vicky@123"
jwt=JWTManager(app)
db=SQLAlchemy(app)
bcrypt=Bcrypt(app)
class User(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(100),unique=True,nullable=False)
    password=db.Column(db.String(200),nullable=False)
    email=db.Column(db.String(100),nullable=False)
@app.route("/")
def home():
    return "backend is running"
@app.route("/signup",methods=["POST"])
def signup():
    data=request.get_json()
    if not data:
        print("not recieved")
    username=data.get("username")
    password=data.get("password")
    email=data.get("email")
    if not username or not password or not email:
        return jsonify({
            "message":"please fill all fields",
            "code":0
            })
    print(username,password,email)
    hashed_pass=bcrypt.generate_password_hash(password).decode("utf-8")
    if User.query.filter_by(username=username).first():
        return jsonify({
            "message":"username already taken",
            "code":0
            })
    elif User.query.filter_by(email=email).first():
        return jsonify({
            "message":"email is already used",
            "code":0
            })
    else:
        user=User(username=username,password=hashed_pass,email=email)
        db.session.add(user)
        db.session.commit()
        return jsonify(
        {
            "message":"user added successfully",
            "code":1
        })
        
@app.route("/deleteAccount",methods=["POST"])
def delacc():
    data=request.get_json()
    username=data.get("username")
    dbuser=User.query.filter_by(username=username).first()
    db.session.delete(dbuser)
    db.commit()
    return jsonify({
        "message":"Account deleted successfully"
    })
@app.route("/login",methods=["POST"])
def login():
    data=request.get_json()
    inputuser=data.get("username")
    inputpassw=data.get("password")
    if not inputuser or not inputpassw:
        return jsonify({
            "message":"please enter username and password",
            "code":0
        })
    dbuser=User.query.filter_by(username=inputuser).first()
    if not dbuser:
        return jsonify({
            "message":"user not found",
            "code":0
        })
    if not bcrypt.check_password_hash(dbuser.password,inputpassw):
        return jsonify({
            "message":"incorrect password",
            "code":0
        })
    access_token=create_access_token(identity=inputuser)    
    return jsonify({
        "message":"login successfull",
        "code":1,
        "token":access_token
    })
@app.route("/profile",methods=["GET"])
@jwt_required()
def profile():
    user=get_jwt_identity()
    return ({
        "message":"private route accessed",
        "user":user
        })
if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
