from werkzeug.wrappers import Request, Response
import threading
from time import sleep
import numpy as np
from CharacterModel import *

class WorkerThread(threading.Thread):
	def __init__(self, input):
		super(WorkerThread, self).__init__()

		self.input = input
		self.output = ""
		self.keepRunning = True

	def run(self):
		self.charModel = CharacterModel(self.input)
		while self.keepRunning == True:
			self.output = self.charModel.train(100)
			sleep(0.1)
			


threads = []
openIndexes = []
highestIndex = 0

def startThread(input):
	global highestIndex, openIndexes, threads

	index = -1
	if len(openIndexes) == 0:
		highestIndex += 1
		threads.append(None)
		index = int(highestIndex-1)
	else:
		index = openIndexes.pop(0)

	thread = WorkerThread(input)
	threads[index] = thread
	thread.start()
	return index

def sampleThread(index):
	global threads

	return threads[index].output

def endThread(index):
	global threads, openIndexes

	threads[index].keepRunning = False
	openIndexes.append(index)

@Request.application
def application(request):
	instring = None
	try:
		instring = request.form['input']
		if len(instring) > 5000000:
			return Response("null")
	except Exception as e:
		pass
	samplingIndex = request.args.get('samplingIndex','null')
	endingIndex = request.args.get('endingIndex','null')

	if instring != None:
		return Response(str(startThread(instring)))
	if samplingIndex != 'null':
		return Response(sampleThread(int(samplingIndex)))
	if endingIndex != 'null':
		endThread(int(endingIndex))
		return Response("Success")
	return Response("null") 	

if __name__ == '__main__':
	from werkzeug.serving import run_simple
	run_simple('localhost', 3000, application)