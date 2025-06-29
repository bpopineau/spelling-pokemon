import json
import re
from nltk.corpus import cmudict
import nltk

# Development Plan:
# - Add command line arguments for input/output paths so the script can be used
#   with alternative word lists.
# - Cache the downloaded CMU dictionary in a project directory to avoid
#   re-downloading when running in CI environments.
# - Consider converting pronunciations to IPA instead of the simplified format
#   if internationalization becomes a priority.

# Utility script to augment `words.json` with phonetic pronunciations using the
# CMU Pronouncing Dictionary. Run this whenever the word list changes to keep
# `words_with_pronunciations.json` in sync.

# Ensure the dictionary is available. The first run will download it to the NLTK
# data directory.
nltk.download('cmudict')

with open("src/data/words.json", "r") as f:
    words = json.load(f)

cmu = cmudict.dict()

def cmu_to_simple(phonemes):
    return "-".join([re.sub(r"\d", "", p) for p in phonemes])

output = []
for word in words:
    # Look up the word in the CMU dictionary (case insensitive). If it's not
    # present we simply leave the pronunciation blank so the UI will fall back
    # to the raw spelling when spoken.
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
    # Save the augmented list next to the original word file. This JSON is read
    # at runtime to provide accurate TTS pronunciation.
    json.dump(output, f, indent=2)
