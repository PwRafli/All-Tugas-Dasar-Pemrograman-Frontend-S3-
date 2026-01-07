from flask import (
    Flask, render_template, request,
    redirect, url_for, session, flash
)
import sqlite3, os, math
from werkzeug.utils import secure_filename
from functools import wraps
from flask import jsonify

app = Flask(__name__)
app.secret_key = "secret_key_yang_aman"

# ================= ADMIN CREDENTIAL =================
ADMIN_USERNAME = "adminhomestay"
ADMIN_PASSWORD = "adminbali123"

# ================= CONFIG =================
UPLOAD_FOLDER = "static/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ================= DATABASE =================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "detailhotel.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            photo TEXT,
            code_room TEXT,
            name TEXT,
            description TEXT,
            room_size TEXT,
            price INTEGER,
            guests INTEGER,
            amenities TEXT,
            available INTEGER
        )
    """)
    conn.commit()
    conn.close()


init_db()

# ================= LOGIN REQUIRED =================
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

# ================= LOGIN =================
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        if (
            request.form["username"] == ADMIN_USERNAME and
            request.form["password"] == ADMIN_PASSWORD
        ):
            session["user_id"] = 1
            return redirect(url_for("admin_dashboard"))
        flash("Login gagal", "danger")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

# ================= FRONTEND =================
@app.route("/")
def index():
    conn = get_db()
    rooms = conn.execute(
        "SELECT * FROM rooms ORDER BY id DESC LIMIT 6"
    ).fetchall()
    conn.close()
    return render_template("index.html", rooms=rooms)

# ===== ROOMS (FRONTEND + SEARCH + PAGINATION) =====
@app.route("/rooms")
def rooms_list():
    page = int(request.args.get("page", 1))
    search = request.args.get("search", "").strip()
    per_page = 9
    offset = (page - 1) * per_page

    conn = get_db()
    params = []
    where = ""

    if search:
        where = "WHERE name LIKE ? OR description LIKE ? OR code_room LIKE ?"
        like = f"%{search}%"
        params.extend([like, like, like])

    total = conn.execute(
        f"SELECT COUNT(*) FROM rooms {where}", params
    ).fetchone()[0]

    rooms = conn.execute(
        f"""
        SELECT * FROM rooms
        {where}
        ORDER BY id DESC
        LIMIT ? OFFSET ?
        """,
        params + [per_page, offset]
    ).fetchall()

    conn.close()
    total_pages = max(1, math.ceil(total / per_page))

    return render_template(
        "rooms.html",
        rooms=rooms,
        page=page,
        total_pages=total_pages,
        search=search
    )

@app.route("/room/<int:id>")
def room_detail(id):
    conn = get_db()
    room = conn.execute(
        "SELECT * FROM rooms WHERE id=?", (id,)
    ).fetchone()
    conn.close()
    if not room:
        return "Room not found", 404
    return render_template("room_detail.html", room=room)

@app.route("/api/rooms")
def api_rooms():
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 9))
    offset = (page - 1) * per_page
    search = request.args.get("search", "").strip()

    conn = get_db()
    params = []
    where = ""

    if search:
        where = "WHERE name LIKE ? OR description LIKE ? OR code_room LIKE ?"
        like = f"%{search}%"
        params.extend([like, like, like])

    total = conn.execute(
        f"SELECT COUNT(*) FROM rooms {where}",
        params
    ).fetchone()[0]

    rooms = conn.execute(
        f"""
        SELECT * FROM rooms
        {where}
        ORDER BY id DESC
        LIMIT ? OFFSET ?
        """,
        params + [per_page, offset]
    ).fetchall()

    conn.close()

    return jsonify({
    "rooms": [
        {
            "id": r["id"],
            "name": r["name"],
            "description": r["description"],
            "price": r["price"],
            "guests": r["guests"],          # ✅ TAMBAH
            "amenities": r["amenities"],    # ✅ TAMBAH
            "photo_url": f"/static/uploads/{r['photo']}"
        }
        for r in rooms
    ],
    "page": page,
    "total_pages": max(1, math.ceil(total / per_page))
})


# ================= ADMIN BACKEND =================
@app.route("/admin")
@login_required
def admin_dashboard():
    page = int(request.args.get("page", 1))
    search = request.args.get("search", "").strip()
    per_page = 5
    offset = (page - 1) * per_page

    conn = get_db()
    params = []
    where = ""

    if search:
        where = "WHERE name LIKE ? OR code_room LIKE ?"
        like = f"%{search}%"
        params.extend([like, like])

    total = conn.execute(
        f"SELECT COUNT(*) FROM rooms {where}", params
    ).fetchone()[0]

    rooms = conn.execute(
        f"""
        SELECT * FROM rooms
        {where}
        ORDER BY id DESC
        LIMIT ? OFFSET ?
        """,
        params + [per_page, offset]
    ).fetchall()

    conn.close()
    total_pages = max(1, math.ceil(total / per_page))

    return render_template(
        "admin_index.html",
        rooms=rooms,
        page=page,
        total_pages=total_pages,
        search=search
    )

# ================= CRUD =================
@app.route("/add", methods=["GET", "POST"])
@login_required
def add():
    if request.method == "POST":
        file = request.files.get("photo")
        filename = "noimage.svg"

        if file and file.filename:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

        conn = get_db()
        conn.execute("""
            INSERT INTO rooms
            (photo, code_room, name, description, room_size, price, guests, amenities, available)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            filename,
            request.form["code_room"],
            request.form["name"],
            request.form["description"],
            request.form["room_size"],
            request.form["price"],
            request.form["guests"],
            request.form["amenities"],
            1 if request.form.get("available") else 0
        ))
        conn.commit()
        conn.close()

        return redirect(url_for("admin_dashboard"))

    return render_template("add.html")


@app.route("/edit/<int:id>", methods=["GET", "POST"])
@login_required
def edit(id):
    conn = get_db()
    room = conn.execute(
        "SELECT * FROM rooms WHERE id=?", (id,)
    ).fetchone()

    if request.method == "POST":
        conn.execute("""
            UPDATE rooms SET
            code_room=?, name=?, description=?,
            room_size=?, price=?, guests=?,
            amenities=?, available=?
            WHERE id=?
        """, (
            request.form["code_room"],
            request.form["name"],
            request.form["description"],
            request.form["room_size"],
            request.form["price"],
            request.form["guests"],
            request.form["amenities"],
            1 if request.form.get("available") else 0,
            id
        ))
        conn.commit()
        conn.close()
        return redirect(url_for("admin_dashboard"))

    conn.close()
    return render_template("edit.html", room=room)


@app.route("/delete/<int:id>")
@login_required
def delete(id):
    conn = get_db()
    conn.execute("DELETE FROM rooms WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return redirect(url_for("admin_dashboard"))

# ================= CART =================
@app.route("/cart")
def cart():
    cart_ids = session.get("cart", [])
    rooms, total = [], 0

    if cart_ids:
        conn = get_db()
        placeholders = ",".join("?" * len(cart_ids))
        rooms = conn.execute(
            f"SELECT * FROM rooms WHERE id IN ({placeholders})",
            tuple(cart_ids)
        ).fetchall()
        conn.close()
        total = sum(r["price"] for r in rooms)

    return render_template("cart.html", rooms=rooms, total=total)

@app.route("/cart/add/<int:id>")
def add_to_cart(id):
    session.setdefault("cart", [])
    if id not in session["cart"]:
        session["cart"].append(id)
        session.modified = True
    return redirect(url_for("cart"))

@app.route("/cart/remove/<int:id>")
def remove_from_cart(id):
    if "cart" in session and id in session["cart"]:
        session["cart"].remove(id)
        session.modified = True
    return redirect(url_for("cart"))

# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)