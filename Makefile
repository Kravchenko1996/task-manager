deploy:
	cd GUI && ng build --prod && cd .. && py build_ui.py && git add . && git commit -m "autocommit" && git push heroku master
