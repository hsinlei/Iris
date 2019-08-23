#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Aug 21 21:03:11 2019

@author: marley
"""
import requests
import json
import gzip
import io
import lxml.html
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize 
from collections import Counter, defaultdict 
import time
import numpy as np
import re
from lxml.html.clean import Cleaner


#'{:06.2f}'
#'{:d}'.format(42)

def search_domain(domain):
    record_list = []
    print ("[*] Trying target domain: {}".format(domain))
    cc_url  = "http://index.commoncrawl.org/CC-MAIN-2019-30-index?"
    cc_url += "url=" + domain + "&matchType=domain&output=json"
    response = requests.get(cc_url)
    if response.status_code == 200:
        records = response.content.splitlines()
        for record in records:
            record_list.append(json.loads(record))  
        print ("[*] Added {:d} results.".format(len(records)))
    print ("[*] Found a total of {:d} hits.".format(len(record_list)))
    return record_list

def download_page(record):
    offset, length = int(record['offset']), int(record['length'])
    offset_end = offset + length - 1

    # We'll get the file via HTTPS so we don't need to worry about S3 credentials
    # Getting the file on S3 is equivalent however - you can request a Range
    prefix = 'https://commoncrawl.s3.amazonaws.com/'

    # We can then use the Range header to ask for just this set of bytes
    resp = requests.get(prefix + record['filename'], headers={'Range': 'bytes={}-{}'.format(offset, offset_end)})

    # The page is stored compressed (gzip) to save space
    # We can extract it using the GZIP library
    
    raw_data = io.BytesIO(resp.content)
    f = gzip.GzipFile(fileobj=raw_data)

    # What we have now is just the WARC response, formatted:
    data = f.read()

    response = ""

    if len(data):
        try:
            warc, header, response = data.strip().split(b'\r\n\r\n', 2)
        except:
            pass

    return response


        

class Index():
    def __init__(self):
        #self.PAGE_LIMIT = app.config['INDEXER_PAGE_LIMIT']
        self.num_docs = 0
        self.word_frequency = defaultdict(int) # number of documents in which a word appears
        self.page_data = {}
        self.reverse_index = {}
        self.reverse_index_tfidf = {}
        """
            {
                'word1': [(www.website.com, 0.001), (www.website2.com, 0.0012)]
            }
        """
        self.stop_words = set(stopwords.words('english'))
        self.stop_words.update(['!','#', '$','&',"'","''","'/",'(',')','*','+',',','.','/','//','0','1',':',';','=','>','?','CD','MD','[','\\/',']','``','db','eq','ul','{','|','}'])
        self.threshold = 18
        self.cleaner = Cleaner()
        self.cleaner.javascript = True
        self.cleaner.style = True
        
    def index_word(self, page, word):
        if not self.reverse_index.get(word):
            self.reverse_index[word] = []
        self.reverse_index[word].append(page)
    def is_valid(self, word):
        valid = re.match('^[\w-]+$', word) is not None  # word is entirely alphanumeric
        valid = valid and len(word) < self.threshold
        return valid
    
    def index_page(self, record, resp):
        self.num_docs += 1
        document = lxml.html.document_fromstring(resp)
        url = record['url']
        title = "oops"
        if document.find(".//title") is not None:
            title = document.find(".//title").text
        self.page_data[url] = {'title': title}
        # tokenize
        word_tokens = word_tokenize(self.cleaner.clean_html(document).text_content().lower())
        # filter stop words
        filtered_doc = [w for w in word_tokens if not w in self.stop_words]
        doc_word_count = len(filtered_doc)
        words = Counter(filtered_doc)
        for word, count in words.items():
            if self.is_valid(word):
                tf = count / doc_word_count
                self.word_frequency[word] += 1
                self.index_word((record['url'],tf), word)
                
    def compute_tfidf(self, inplace=False):
        # convert tfs to tfidfs and rank (in-place)
        for word, pages in self.reverse_index.items():
            idf = np.log10(self.num_docs / self.word_frequency[word])
            sorted_pages = sorted(pages, key=lambda tup: tup[1], reverse=True)
            sorted_pages = [(word, tf*idf) for word, tf in sorted_pages]
            if inplace:
                self.reverse_index[word] = sorted_pages
            else:
                self.reverse_index_tfidf[word] = sorted_pages
            #pages.sort(key=lambda tup: tup[1])
    
    def score_tfidf(self, query, n=10):
        reverse_index = self.reverse_index_tfidf
        if not len(self.reverse_index_tfidf):
            reverse_index = self.reverse_index
        pages = defraultdict(int)
        for word in query.split(" "):
            if reverse_index.get(word.lower()):     # if word exists in corpus
                num_pages = min(len(reverse_index[word]), n)
                for page, tfidf in reverse_index[word][:num_pages]:
                    pages[page] += tfidf
        sorted_pages = sorted(pages.items(), key=lambda kv: kv[1], reverse=True)
        return sorted_pages
    def query(self, query, n=10):
        for page, score in self.score_tfidf(query, n=n):
            print(self.page_data[page]['title'], score)
lim = None
mcgill = "https://cs.mcgill.ca"
medium = "https://www.medium.com"
pubmed = "https://www.ncbi.nlm.nih.gov/pubmed/"
paul = "http://www.paulgraham.com"
scott = "https://slatestarcodex.com"
step = 12
ulimit=None

record_list = search_domain(paul)
#record_list.extend(search_domain(scott)[:lim])
medium_list = search_domain(medium)[::step]
pubmed_list = search_domain(pubmed)[::step]
record_list.extend(medium_list[:lim])
record_list.extend(pubmed_list[:lim])

#record_list = search_domain(pubmed)[::12]
record_list = record_list[:ulimit]
print(len(record_list))
dex = Index()
start_time = time.time()
for idx, record in enumerate(record_list):
    resp = download_page(record)
    if resp:
        dex.index_page(record, resp)
    else:
        print("EMPTY")
    if (idx % 10 == 0):
        print("finished {} pages of {} in {} seconds".format(idx, len(record_list), int(time.time() - start_time)))
    if (idx % 100 == 0):
        dex.compute_tfidf()
        dex.query('cancer')
        dex.query('proteins')
        dex.query('sleep')
dex.query('startup')
dex.compute_tfidf()
dex.query('startup')



with open('index.json', 'w', encoding='utf-8') as f:
    json.dump({'page_data': dex.page_data, 'reverse_index': dex.reverse_index_tfidf}, f, ensure_ascii=False, indent=4)

"""
record = record_list[0]
offset, length = int(record['offset']), int(record['length'])
offset_end = offset + length - 1

# We'll get the file via HTTPS so we don't need to worry about S3 credentials
# Getting the file on S3 is equivalent however - you can request a Range
prefix = 'https://commoncrawl.s3.amazonaws.com/'

# We can then use the Range header to ask for just this set of bytes
resp = requests.get(prefix + record['filename'], headers={'Range': 'bytes={}-{}'.format(offset, offset_end)})

# The page is stored compressed (gzip) to save space
# We can extract it using the GZIP library

raw_data = io.BytesIO(resp.content)
f = gzip.GzipFile(fileobj=raw_data)

# What we have now is just the WARC response, formatted:
data = f.read()
"""