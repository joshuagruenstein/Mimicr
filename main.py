from werkzeug.wrappers import Request, Response
from threading import Thread
from time import sleep
import numpy as np

outputs = []

def newThread(instring):
	num = 5
	return str(5)

@Request.application
def application(request):
	instring = request.args.get('input', 'noinput')
	index = request.args.get('index','noindex')

	if index == 'noindex':
		newdex = newThread(instring)
		return Response(newdex)

	mostRecent = outputs[int(index)]
	return Response(mostRecent)

if __name__ == '__main__':
	from werkzeug.serving import run_simple
	run_simple('localhost', 4000, application)