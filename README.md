##1. Install virtualenv: 
```bash 
pip install virtualenv
```
##2. Create virtualenv 
``` bash
virtualenv -p python3.8 venv
```
##3. Activate virtualenv:
####3.1. For Windows:
```bash
.\venv\Scripts\activate.bat
```
####3.2. For Linux: 
```bash 
source /venv/bin/activate
```
##4. Install requirements.txt:
```bash
pip install -r requirements.txt
```
##5. Run migrations:
```bash
python manage.py migrate
```
##6. Run server:
```bash
python manage.py runserver
```
##7. Angular installation:
```bash
npm install @angular/cli
```
##8. Install node.js requirements:
```bash
npm install
```
##9. Run Angular server: 
```bash
cd GUI
npm start
```
