from werkzeug.wrappers import Request, Response
import threading
from time import sleep
import numpy as np

outputs = []
openIndexes = []
threads = []
highestIndex = 0

def runRobot(instring, index):
	global outputs
	while True:
		outputs[index] = instring
		sleep(0.1)

def chooseFreeIndex():
	global highestIndex, openIndexes
	print(highestIndex)
	if len(openIndexes) == 0:
		highestIndex += 1
		outputs.append("")
		return int(highestIndex-1)
	else:
		return openIndexes.pop(0)
		
@Request.application
def application(request):
	global threads
	instring = request.args.get('input', 'null')
	index = request.args.get('index','null')
	if instring == "null" and index == "null":
		return Response("null")

	print("process")
	if index == 'null':
		newIndex = chooseFreeIndex()
		thread = threading.Thread(target=runRobot, args=(instring, newIndex,))
		threads.append(thread)
		thread.start()
		return Response(str(newIndex))

	mostRecent = outputs[int(index)]
	return Response(mostRecent)

if __name__ == '__main__':
	from werkzeug.serving import run_simple
	run_simple('localhost', 3000, application)