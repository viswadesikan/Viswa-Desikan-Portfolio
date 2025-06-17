from flask import Flask, render_template, request, redirect, flash
from flask_mail import Mail, Message
import os
import secrets

# Generate a secret key
SECRET_KEY = '7acaf310498fb5ab8a3fbb74464fe8fedd88b3a73c8f7bd5425a030cae708feb'

app = Flask(__name__)
app.secret_key = SECRET_KEY


# Mail config
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='viswadesikan25@gmail.com',     # Sender (your) email
    MAIL_PASSWORD='kiji joqw tneh yoki',            # Gmail app password
    MAIL_DEFAULT_SENDER='viswadesikan25@gmail.com'
)

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    # Message to Admin
    admin_msg = Message(
        subject=f"New Message from {name}",
        recipients=['viswadesikan25@gmail.com'],
        body=f"From: {name} <{email}>\n\nMessage:\n{message}"
    )
    
    # Confirmation to Sender
    user_msg = Message(
        subject="Thank You for Contacting Me!",
        recipients=[email],
        body=f"Hi {name},\n\nThank you for reaching out! I’ve received your message:\n\n\"{message}\"\n\nI will get back to you shortly.\n\n- Viswa Desikan"
    )

    try:
        mail.send(admin_msg)
        mail.send(user_msg)
        flash("Message sent successfully! ✅")
    except Exception as e:
        flash(f"Error sending message: {str(e)} ❌")

    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
