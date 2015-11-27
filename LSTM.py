from __future__ import print_function
from keras.models import Sequential
from keras.layers.core import Dense, Activation, Dropout
from keras.layers.recurrent import LSTM
from keras.datasets.data_utils import get_file
import numpy as np
import random
import sys



class CharacterModel:
	def __init__(self, text):
		self.text = text
		
		self.currentIndex = 0

		self.chars = set(self.text)
		print('total chars:', len(self.chars))
		self.char_indices = dict((c, i) for i, c in enumerate(self.chars))
		self.indices_char = dict((i, c) for i, c in enumerate(self.chars))

		# cut the text in semi-redundant sequences of self.maxlen characters
		self.maxlen = 20
		step = 3
		self.sentences = []
		next_chars = []
		for i in range(0, len(self.text) - self.maxlen, step):
			self.sentences.append(self.text[i: i + self.maxlen])
			next_chars.append(self.text[i + self.maxlen])
		print('nb sequences:', len(self.sentences))

		print('Vectorization...')
		self.Xset = np.zeros((len(self.sentences), self.maxlen, len(self.chars)), dtype=np.bool)
		self.y = np.zeros((len(self.sentences), len(self.chars)), dtype=np.bool)
		for i, sentence in enumerate(self.sentences):
			for t, char in enumerate(sentence):
				self.Xset[i, t, self.char_indices[char]] = 1
			self.y[i, self.char_indices[next_chars[i]]] = 1

		self.model = Sequential()
		self.model.add(LSTM(512, return_sequences=True, input_shape=(self.maxlen, len(self.chars))))
		self.model.add(Dropout(0.2))
		self.model.add(LSTM(512, return_sequences=False))
		self.model.add(Dropout(0.2))
		self.model.add(Dense(len(self.chars)))
		self.model.add(Activation('softmax'))

		self.model.compile(loss='categorical_crossentropy', optimizer='rmsprop')


	def sample(self, a, temperature=1.0):
		# helper function to sample an index from a probability array
		a = np.log(a) / temperature
		a = np.exp(a) / np.sum(np.exp(a))
		return np.argmax(np.random.multinomial(1, a, 1))

	def train(self, iterations):

		X = None
		if self.currentIndex + self.maxlen <= len(self.Xset):
			X = self.Xset[self.currentIndex : self.currentIndex+self.maxlen]
		else:
			X = np.concatenate((self.Xset[self.currentIndex : len(self.Xset)], self.Xset[0:self.maxlen-(len(self.Xset) - self.currentIndex)]), axis=0)
		print("len")
		print(len(X))
		print(X)
		self.model.fit(X, self.y, batch_size=64, nb_epoch=1)
		start_index = random.randint(0, len(self.text) - self.maxlen - 1)
		diversity = 0.5
		generated = ''
		sentence = self.text[start_index: start_index + self.maxlen]
		generated += sentence
		print('----- Generating with seed: "' + sentence + '"')
		sys.stdout.write(generated)

		for iteration in range(100):
			x = np.zeros((1, self.maxlen, len(self.chars)))
			for t, char in enumerate(sentence):
				x[0, t, self.char_indices[char]] = 1.

			preds = self.model.predict(x, verbose=0)[0]
			next_index = self.sample(preds, diversity)
			next_char = self.indices_char[next_index]

			generated += next_char
			sentence = sentence[1:] + next_char
		return generated