import json
import re
from nltk.corpus import cmudict
import nltk

nltk.download('cmudict')

with open("src/data/words.json", "r") as f:
    words = json.load(f)

cmu = cmudict.dict()

def cmu_to_simple(phonemes):
    return "-".join([re.sub(r"\d", "", p) for p in phonemes])

output = []
for word in words:
    key = word.lower()
    if key in cmu:
        pronunciation = cmu_to_simple(cmu[key][0])
    else:
        pronunciation = ""
    output.append({
        "word": word,
        "pronunciation": pronunciation
    })

with open("src/data/words_with_pronunciations.json", "w") as f:
    json.dump(output, f, indent=2)
