from datetime import timedelta,date
from flask import Flask, jsonify, render_template, request
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from models import User,Cart,CartItem,Order,OrderItem,Product,db
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
app.config["JWT_SECRET_KEY"]="******"
db.init_app(app)
jwt=JWTManager(app)
bcrypt=Bcrypt(app)
@app.route("/",methods=["POST"])
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
        "userid":dbuser.id,
        "token":access_token
    })
@app.route("/profile",methods=["GET"])
@jwt_required()
def profile():
    user=get_jwt_identity()
    return jsonify({
        "message":"private route accessed",
        "user":user
        })
@app.route("/add-to-cart", methods=["POST"])
def add_to_cart():
    data = request.json
    user_id = data["user_id"]
    product_id = data["product_id"]
    fun=data["fun"]


    cart = Cart.query.filter_by(user_id=user_id).first()

    if not cart:
        if fun=="dec":
            return jsonify({"message":"no cart"})
        cart = Cart(user_id=user_id)
        db.session.add(cart)

    item = CartItem.query.filter_by(cart_id=cart.id, product_id=product_id).first()

    if item and fun=="inc":
        item.quantity += 1
    elif item and fun=="dec":
        if item.quantity>1:
            item.quantity-=1
    else:
        item = CartItem(cart_id=cart.id, product_id=product_id, quantity=1)
        db.session.add(item)

    db.session.commit()

    return jsonify({"message": "Added"})
@app.route("/cart/<int:user_id>", methods=["GET"])
def get_cart(user_id):
    cart = Cart.query.filter_by(user_id=user_id).first()

    if not cart:
        return jsonify([])

    items = CartItem.query.filter_by(cart_id=cart.id).all()

    result = []
    for item in items:
        
        product = Product.query.get(item.product_id)

        result.append({
            "product_id": product.id,
            "name": product.name,
            "price": product.price,
            "quantity": item.quantity,
            "image":f"http://localhost:5000/static/{product.image}"
        })
        

    return jsonify(result)
@app.route("/remove-item", methods=["POST"])
def remove_item():
    data = request.json
    user_id = data["user_id"]
    product_id = data["product_id"]

    cart = Cart.query.filter_by(user_id=user_id).first()

    item = CartItem.query.filter_by(cart_id=cart.id, product_id=product_id).first()

    if item:
        db.session.delete(item)
        db.session.commit()

    return jsonify({"message": "Removed"})
@app.route("/post-to-orders",methods=["POST"])
def post_order():
    data=request.json
    user_id=data["user_id"]
    ordered_date=date.today()
    arrival_date=ordered_date+timedelta(days=5)
    total_price=data["total_price"]

    cart=Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return jsonify("There are no items in the cart to order")
    order=Order(user_id=user_id,ordered_date=ordered_date,arrival_date=arrival_date,total_price=total_price)
    db.session.add(order)
    db.session.flush()
    items = CartItem.query.filter_by(cart_id=cart.id).all()
    for item in items:
        Ordered_item=OrderItem(order_id=order.id,product_id=item.product_id,quantity=item.quantity)
        db.session.add(Ordered_item)
    for item in items:
        db.session.delete(item)
    db.session.commit()
    return jsonify("order palced successfully")
    
@app.route("/orders/<int:user_id>",methods=["GET"])
def get_orders(user_id):

    orders=Order.query.filter_by(user_id=user_id).all()
    if not orders:
        return jsonify([])
    for order in orders:
        items=OrderItem.query.filter_by(order_id=order.id).all()
        res=[]
        for item in items:
            product=Product.query.get(item.product_id)
            res.append({
                "product_id": product.id,
                "name": product.name,
                "price": product.price,
                "quantity": item.quantity,
                "image":f"http://localhost:5000/static/{product.image}"
            })

    
    delivery=[]
    delivery.append({
        "ordered_date":order.ordered_date,
        "arrival_date":order.arrival_date,
        "total_amount":order.total_price,
        "items":res
    })
    return jsonify(delivery)


if __name__=="__main__":
    with app.app_context():
        db.create_all()

        if Product.query.count() == 0:
            products = [
                Product(id=1, name="Eggs", price=72, image="eggs.jpg"),
                Product(id=2, name="Red Bull", price=120, image="redbull.jpg"),
                Product(id=3, name="Coffee Powder", price=129, image="coffee.jpg"),
                Product(id=4, name="Tea Powder", price=69, image="gemini.png"),
                Product(id=5, name="Milk Packet", price=29, image="milk.jpg"),
                Product(id=6, name="Curd", price=49, image="curd.jpg"),
                Product(id=7, name="Maggie", price=37, image="maggie.jpg"),
                Product(id=8, name="Santoor", price=49, image="santoor.jpg")
            ]
            db.session.add_all(products)
            db.session.commit()
    app.run(debug=True)
