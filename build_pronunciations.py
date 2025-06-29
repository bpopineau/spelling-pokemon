import argparse
import json
import re

# Development Plan:
# - Add command line arguments for input/output paths so the script can be used
#   with alternative word lists.
# - Cache the downloaded CMU dictionary in a project directory to avoid
#   re-downloading when running in CI environments.
# - Consider converting pronunciations to IPA instead of the simplified format
#   if internationalization becomes a priority.
# - Expose a flag to skip words that already have manual pronunciations so
#   repeated runs don't overwrite curated data.
# - Document usage examples directly in this file for quick reference when
#   onboarding new contributors.

# Utility script to augment `words.json` with phonetic pronunciations using the
# CMU Pronouncing Dictionary. Run this whenever the word list changes to keep
# `words_with_pronunciations.json` in sync.
#
# Usage:
#   python build_pronunciations.py \
#       --input src/data/words.json \
#       --output src/data/words_with_pronunciations.json

def cmu_to_simple(phonemes):
    """Convert CMU phonemes to a simplified dash-separated string."""
    return "-".join([re.sub(r"\d", "", p) for p in phonemes])


def build_pronunciations(input_path: str, output_path: str) -> None:
    """Generate pronunciation JSON for the given word list."""
    import nltk
    from nltk.corpus import cmudict

    # Ensure the dictionary is available. The first run will download it to the
    # NLTK data directory.
    nltk.download("cmudict")

    with open(input_path, "r") as f:
        words = json.load(f)

    cmu = cmudict.dict()

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
        output.append({"word": word, "pronunciation": pronunciation})

    with open(output_path, "w") as f:
        # Save the augmented list next to the original word file. This JSON is read
        # at runtime to provide accurate TTS pronunciation.
        json.dump(output, f, indent=2)


def parse_args() -> argparse.Namespace:
    """Parse command-line arguments for input and output paths."""
    parser = argparse.ArgumentParser(
        description="Generate pronunciations using the CMU Pronouncing Dictionary"
    )
    parser.add_argument(
        "-i",
        "--input",
        default="src/data/words.json",
        help="Path to the input word list JSON",
    )
    parser.add_argument(
        "-o",
        "--output",
        default="src/data/words_with_pronunciations.json",
        help="Path for the generated pronunciation JSON",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    build_pronunciations(args.input, args.output)
