from werkzeug.wrappers import Request, Response
from threading import Thread
from time import sleep

@Request.application
def application(request):
	instring = request.args.get('input', 'noinput')
	print instring

	return Response("hi")

if __name__ == '__main__':
	from werkzeug.serving import run_simple
	run_simple('localhost', 4000, application)