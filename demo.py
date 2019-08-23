#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Aug 22 14:26:06 2019

@author: marley
"""
import seaborn as sns

class Demo():
    def __init__(self, dex):
        self.dex = dex
        
    def plot_wordlengths(self, cutoff=30):
        arr = [len(word) for word,freq in self.dex.word_frequency.items() if len(word) < cutoff]
        sns.distplot(arr)
        
    def plot_wordfrequencies(self):
        arr = [freq for word,freq in self.dex.word_frequency.items()]
        sns.distplot(arr)